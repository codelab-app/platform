#!make

.PHONY: %

docker-start:
	docker-compose up

docker-restart:
	docker-compose down -v && \
	docker-compose up

hasura-metadata-export:
	npx hasura metadata export \
		--project .hasura \
		--envfile ../.env

hasura-metadata-import:
	npx hasura metadata apply \
		--project .hasura \
		--envfile ../.env