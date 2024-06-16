package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func NewHTTPServer(listenAddr string, store Storage) *HTTPServer {
	return &HTTPServer{
		listenAddr: listenAddr,
		store:      store,
	}
}

func (s *HTTPServer) Run() {
	mux := http.NewServeMux()

	buildHandler := http.FileServer(http.Dir(os.Getenv("BUILD_PATH")))
	mux.Handle("/", buildHandler)

	mux.HandleFunc("/api/elementi/{id}", MakeHandlerFunc(s.handleElementRoute))
	mux.Handle("/api/", mux)

	log.Println("App is running")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func (s *HTTPServer) handleElementRoute(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		id := GetId(r)
		fmt.Println(id)
		queryParams := GetQueryParams(r)
		section := queryParams.Get("section")

		if section == "physical" {
			tmp := make([]ElementContentObject, 5)
			for i := range tmp {
				tmp[i].Component = "formula"
				tmp[i].Content = "content lmao"
			}
			a := ElementContentResponse{tmp}
			return WriteJSON(w, http.StatusOK, a)
		}

		return WriteJSON(w, http.StatusOK, map[string]string{"id": id})
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}
