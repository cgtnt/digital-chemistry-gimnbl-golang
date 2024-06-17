package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
)

func NewHTTPServer(listenAddr string, store Storage, elist map[string]string) *HTTPServer {
	return &HTTPServer{
		listenAddr:   listenAddr,
		store:        store,
		elementsList: elist,
	}
}

func (s *HTTPServer) Run() {
	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir(os.Getenv("BUILD_PATH")))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			fullPath := os.Getenv("BUILD_PATH") + "/" + strings.TrimPrefix(path.Clean(r.URL.Path), "/")
			_, err := os.Stat(fullPath)
			if err != nil {
				if !os.IsNotExist(err) {
					panic(err)
				}
				r.URL.Path = "/"
			}
		}
		fs.ServeHTTP(w, r)
	})

	mux.HandleFunc("/api/elementi/{id}", MakeHandlerFunc(s.handleElementRoute))

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
			tmp := ElementGeneralResponse{Name: "vodonik", Symbol: "H", ImageSource: "/images/vodonik.png"}
			return WriteJSON(w, http.StatusOK, tmp)
		}

		if section == "physical" {
			tmp := make([]ElementContentObject, 5)
			for i := range tmp {
				tmp[i].Component = "formula"
				tmp[i].Content = "content lmao"
			}
			a := ElementSectionResponse{tmp}
			return WriteJSON(w, http.StatusOK, a)
		}
		return fmt.Errorf("not found")

	}

	return fmt.Errorf("method not allowed %s", r.Method)
}
