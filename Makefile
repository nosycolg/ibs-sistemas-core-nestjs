include .env

.PHONY: up

up:
	docker-compose up && npm run start:dev

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs -f