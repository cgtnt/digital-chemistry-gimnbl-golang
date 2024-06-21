package main

import (
	"net/http"
)

type APIFunc func(w http.ResponseWriter, r *http.Request) error

type Element struct {
	Name               string             `json:"name"`
	GeneralProperties  GeneralProperties  `json:"generalProperties"`
	SpecificProperties SpecificProperties `json:"specificProperties"`
}

type GeneralProperties struct {
	Name        string `json:"name"`
	Symbol      string `json:"symbol"`
	ImageSource string `json:"imageSource"`
}

type SpecificProperties struct {
	Physical  []PropertiesContentObject `json:"physical"`
	Chemical  []PropertiesContentObject `json:"chemical"`
	Usage     []PropertiesContentObject `json:"usage"`
	Reactions []PropertiesContentObject `json:"reactions"`
}
type PropertiesContentObject struct {
	Id        string `json:"id"`
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
