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

type ElementPropertiesResponse struct {
	Physical  []PropertiesContentObject `json:"physical"`
	Chemical  []PropertiesContentObject `json:"chemical"`
	Usage     []PropertiesContentObject `json:"usage"`
	Reactions []PropertiesContentObject `json:"reactions"`
}
type ElementSectionResponse struct {
	Array []PropertiesContentObject `json:"array"`
}

type PropertiesContentObject struct {
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
