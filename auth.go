package main

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"time"
)

func createJWT(account *AdminAccount) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       account.ID,
		"username": account.Username,
		"exp":      time.Now().Add(time.Second * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", fmt.Errorf("failed creating token")
	}

	return tokenString, nil
}

func validateAccountLogin(acc *AdminAccount, pass string) error {
	return bcrypt.CompareHashAndPassword([]byte(acc.PasswordHash), []byte(pass))
}

func verifyToken(tokenString string, s Storage) (*jwt.Token, error) {
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return nil, err
	}

	exp := int64(claims["exp"].(float64))
	if exp <= time.Now().Unix() {
		return nil, fmt.Errorf("expired token")
	}

	account, err := s.GetAccountByUsername(claims["username"].(string))
	if account == nil || err != nil || int(claims["id"].(float64)) != account.ID {
		return nil, fmt.Errorf("no account")
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token, nil
}

func JWTMiddleware(handler http.HandlerFunc, s Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			WriteJSON(w, http.StatusUnauthorized, APIError{Error: "missing auth header"})
			return
		}

		tokenString = tokenString[len("Bearer "):]

		_, err := verifyToken(tokenString, s)
		if err != nil {
			WriteJSON(w, http.StatusUnauthorized, APIError{Error: err.Error()})
			return
		}

		handler(w, r)
	}
}
