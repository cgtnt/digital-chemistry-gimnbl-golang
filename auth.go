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
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(os.Getenv("JWT_SECRET"))
	if err != nil {
		return "", fmt.Errorf("unauthorized")
	}

	return tokenString, nil
}

func validateAccountLogin(acc *AdminAccount, pass string) error {
	return bcrypt.CompareHashAndPassword([]byte(acc.PasswordHash), []byte(pass))
}

func verifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return os.Getenv("JWT_SECRET"), nil
	})

	if err != nil {
		return nil, err
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
			WriteJSON(w, http.StatusUnauthorized, "Missing auth header")
			return
		}

		tokenString = tokenString[len("Bearer "):]

		token, err := verifyToken(tokenString)
		if err != nil {
			WriteJSON(w, http.StatusUnauthorized, "Invalid token")
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			WriteJSON(w, http.StatusUnauthorized, "Invalid token")
			return
		}

		exp := claims["exp"].(int64)
		if exp <= time.Now().Unix() {
			WriteJSON(w, http.StatusUnauthorized, "Invalid token")
			return
		}

		account, err := s.GetAccountByUsername(claims["username"].(string))
		if account == nil || err != nil || claims["id"].(int) != account.ID {
			WriteJSON(w, http.StatusUnauthorized, "Invalid token")
			return
		}

		handler(w, r)
	}
}
