package main

import (
	"encoding/json"
	"net/http"
	"regexp"
)

func MakeHandlerFunc(f APIFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w, r); err != nil {
			WriteJSON(w, http.StatusBadRequest, APIError{Error: err.Error()})
		}
	}
}

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

func GetId(r *http.Request) string {
	id := r.PathValue("id")
	regex, _ := regexp.Compile("[^a-zA-Z0-9 ]+")
	return regex.ReplaceAllString(id, "")
}
