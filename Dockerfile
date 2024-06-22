FROM golang:1.22.4-alpine

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY *.go .

RUN go build -o /usr/dist/app 

COPY ./elementi.json /usr/dist/elementi.json
COPY ./dist/client/. /usr/dist/client/

EXPOSE 8080

WORKDIR /usr/dist

CMD ["./app", "-prod"]