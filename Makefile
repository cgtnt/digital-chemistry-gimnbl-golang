build:
	@cd backend; \
	go build -o ../dist/app;
	@mkdir -p dist/client/build/images
	@cp -a dist/client/build/images/. frontend/public/images/;
	@cp .env.dev frontend/.env
	@cd frontend; \
	npm run build;
	@rm frontend/.env
	@rm -r frontend/public/images
	@cp elementi.json dist/elementi.json
run: build
	@./dist/app
start:
	@./dist/app
