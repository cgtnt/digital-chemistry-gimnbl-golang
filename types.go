package main

import (
	"net/http"
)

type APIFunc func(w http.ResponseWriter, r *http.Request) error

type ElementGeneralResponse struct {
	Name        string `json:"name"`
	Symbol      string `json:"symbol"`
	ImageSource string `json:"imageSource"`
}
type ElementSectionResponse struct {
	Array []ElementContentObject `json:"array"`
}

type ElementContentObject struct {
	Component string `json:"component"`
	Content   string `json:"content"`
}

type APIError struct {
	Error string `json:"error"`
}

type HTTPServer struct {
	listenAddr   string
	store        Storage
	elementsList map[string]string
	fileServer   http.Handler
}

type Page struct {
	ID      int
	Element string
	Content string
}
