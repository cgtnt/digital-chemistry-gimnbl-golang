package main

import (
	"fmt"
	"log"
	"net/http"
)

func NewHTTPServer(listenAddr string, store Storage) *HTTPServer {
	return &HTTPServer{
		listenAddr: listenAddr,
		store:      store,
	}
}

func (s *HTTPServer) Run() {
	mux := http.NewServeMux()

	// mux.HandleFunc("/zasluge")
	mux.HandleFunc("/elementi/{id}", MakeHandlerFunc(s.handleElementRoute))

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
