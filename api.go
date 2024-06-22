package main

import (
	"database/sql"
	"encoding/json"
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
	mux.HandleFunc("/api/editor/elements/{id}", JWTMiddleware(MakeHandlerFunc(s.handleEditorRoute), s.store))
	mux.HandleFunc("/api/editor/images", JWTMiddleware(MakeHandlerFunc(s.handleUploadFile), s.store))
	mux.HandleFunc("/api/login", MakeHandlerFunc(s.handleLogin))

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

		element, err := s.store.GetElementByName(id)
		if err != nil {
			if err == sql.ErrNoRows {
				log.Println(err)
				return err
			}
			log.Println(err)
			return err
		}

		if section == "general" {
			return WriteJSON(w, http.StatusOK, element.GeneralProperties)
		}

		if section == "properties" {
			return WriteJSON(w, http.StatusOK, element.SpecificProperties)
		}

		return fmt.Errorf("not found")
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

func (s *HTTPServer) handleEditorRoute(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "POST" {
		id := GetId(r)
		fmt.Println(id)

		if _, ok := s.elementsList[id]; !ok {
			return fmt.Errorf("not found")
		}

		element := &Element{}
		if err := json.NewDecoder(r.Body).Decode(element); err != nil {
			log.Println("[CMS Create] Error: ", err)
			return fmt.Errorf("bad request")
		}

		element.GeneralProperties.Name = id
		element.GeneralProperties.Symbol = s.elementsList[id]

		if err := s.store.CreateElement(element); err != nil {
			log.Println("[CMS Create] Error: ", err)
			return fmt.Errorf("failed saving element")
		}

		return WriteJSON(w, http.StatusCreated, map[string]string{"message": "element saved successfully"})
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

func (s *HTTPServer) handleLogin(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "POST" {
		return fmt.Errorf("method not allowed")
	}

	loginRequest := &LoginRequest{}
	if err := json.NewDecoder(r.Body).Decode(loginRequest); err != nil {
		return fmt.Errorf("missing username or password")
	}

	account, err := s.store.GetAccountByUsername(loginRequest.Username)
	if err != nil {
		return fmt.Errorf("invalid credentials")
	}

	if err := validateAccountLogin(account, loginRequest.Password); err != nil {
		return fmt.Errorf("invalid credentials")
	}

	tokenString, err := createJWT(account)
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, map[string]string{"token": tokenString})
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
