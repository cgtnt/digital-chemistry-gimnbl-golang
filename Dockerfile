FROM golang:1.22.4-alpine

WORKDIR /usr/src

COPY backend/ ./
RUN go mod download && go mod verify

RUN go build -o /usr/dist/app 

FROM node:18-alpine

WORKDIR /usr/src/

COPY frontend/src/ ./src/
COPY frontend/public/ ./public/
COPY frontend/package*.json ./
COPY .env .env

RUN npm i
RUN npm run build

FROM scratch

WORKDIR /usr/dist

COPY ./elementi.json ./elementi.json
COPY --from=0 /usr/dist/app ./app
COPY --from=1 /usr/src/build/ ./client/

EXPOSE 8080

CMD ["./app", "-prod"]