package main

import (
	"net/http"
)

type APIFunc func(w http.ResponseWriter, r *http.Request) error

type APIError struct {
	Error string `json:"error"`
}

type HTTPServer struct {
	listenAddr string
	store      Storage
}

type Page struct {
	ID      int
	Element string
	Content string
}
