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
		return WriteJSON(w, http.StatusOK, map[string]string{"id": id})
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}
