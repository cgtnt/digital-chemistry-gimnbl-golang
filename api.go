package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func NewHTTPServer(listenAddr string, store Storage, elist map[string]string, fs http.Handler) *HTTPServer {
	return &HTTPServer{
		listenAddr:   listenAddr,
		store:        store,
		elementsList: elist,
		fileServer:   fs,
	}
}

func (s *HTTPServer) Run() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", MakeHandlerFunc(s.serveFile))

	mux.HandleFunc("/api/elements/{id}", MakeHandlerFunc(s.handleElementRoute))
	mux.HandleFunc("/api/editor/images", MakeHandlerFunc(s.handleUploadFile))

	log.Println("App is running")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func (s *HTTPServer) handleElementRoute(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		id := GetId(r)
		fmt.Println(id)

		if _, ok := s.elementsList[id]; !ok {
			return fmt.Errorf("not found")
		}

		queryParams := GetQueryParams(r)
		section := queryParams.Get("section")

		if section == "general" {
			tmp := ElementGeneralResponse{Name: "vodonik", Symbol: "H", ImageSource: "/images/vodonik.jpg"}
			return WriteJSON(w, http.StatusOK, tmp)
		}

		if section == "properties" {
			tmp := make([]PropertiesContentObject, 5)
			for i := range tmp {
				tmp[i].Component = "formula"
				tmp[i].Content = "content lmao"
			}

			tmp2 := make([]PropertiesContentObject, 5)
			for i := range tmp2 {
				tmp2[i].Component = "formula"
				tmp2[i].Content = "chemical lmao"
			}

			a := ElementPropertiesResponse{Physical: tmp, Chemical: tmp2, Usage: tmp, Reactions: tmp}
			return WriteJSON(w, http.StatusOK, a)
		}

		return fmt.Errorf("not found")

	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

func (s *HTTPServer) serveFile(w http.ResponseWriter, r *http.Request) error {
	if r.URL.Path != "/" {
		fullPath := os.Getenv("BUILD_PATH") + "/" + strings.TrimPrefix(path.Clean(r.URL.Path), "/")
		_, err := os.Stat(fullPath)
		if err != nil {
			if !os.IsNotExist(err) {
				return fmt.Errorf("server error")
			}
			r.URL.Path = "/"
		}
	}
	s.fileServer.ServeHTTP(w, r)
	return nil
}

func (s *HTTPServer) handleUploadFile(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "POST" {
		if err := r.ParseMultipartForm(int64(20971520)); err != nil {
			log.Println("[CMS Edit] [File Upload] ", err)
			return fmt.Errorf("failed saving file")
		} //20mb po slici max

		r.Body = http.MaxBytesReader(w, r.Body, int64(20971520))

		file, header, err := r.FormFile("file")
		if err != nil {
			log.Println("[CMS Edit] [File Upload] ", err)
			return fmt.Errorf("no file submitted")
		}

		log.Println("[CMS Edit] Incoming file upload: ", header.Filename)

		headerBuff := make([]byte, 512)
		if _, err := file.Read(headerBuff); err != nil {
			log.Println("[CMS Edit] [File Upload] ", err)
			return fmt.Errorf("failed saving file")
		}

		if _, err := file.Seek(0, 0); err != nil {
			log.Println("[CMS Edit] [File Upload] ", err)
			return fmt.Errorf("failed saving file")
		}

		if http.DetectContentType(headerBuff) != "image/jpeg" {
			log.Println("[CMS Edit] [File Upload] Invalid file type")
			return fmt.Errorf("invalid file type")
		}

		defer file.Close()

		pwd, err := os.Getwd()
		if err != nil {
			log.Println("[CMS Edit] [File Upload] ", err)
			return fmt.Errorf("failed saving file")
		}

		dest, err := os.CreateTemp(path.Join(pwd, "/dist/client/build/images/"), "upload*.jpg")
		if err != nil {
			log.Println("[CMS Edit] [File Upload] ", err)
			return fmt.Errorf("failed saving file")
		}

		if _, err := io.Copy(dest, file); err != nil {
			log.Println("[CMS Edit] [File Upload] ", err)
			return fmt.Errorf("failed saving file")
		}

		reactPath := path.Join("/images", filepath.Base(dest.Name()))

		log.Println("[CMS Edit] Uploaded file: ", dest.Name())
		return WriteJSON(w, http.StatusCreated, map[string]string{"imageSource": reactPath})

	}
	return fmt.Errorf("method not allowed %s", r.Method)
}
