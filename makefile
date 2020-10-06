#!make

.PHONY: %

#
# BUILD
#


build-dev:
	@npx nx run-many \
	--target=build \
	--all \
	--parallel \
	"$@"

build-ci:
	@npx nx run-many \
    --target=build \
    --all \
    --parallel \
    --maxWorkers=4

build-prod:
	@npx nx run-many \
    --target=build \
    --projects=web,api \
    --with-deps \
    --parallel \
    --skip-nx-cache \
    --maxWorkers=4

#
# Docker
#

docker-build:
	@docker-compose \
  --verbose \
  -f .docker/docker-compose.yml \
  build app

docker-push:
	@docker-compose \
		-f .docker/docker-compose.yml \
		push app

#
# LINT
#

lint-commit-ci:
	@echo "${CIRCLE_BASE_REVISION}"
	@npx commitlint --from="${CIRCLE_BASE_REVISION}" "$@"

lint-commit-dev:
	@npx commitlint -E HUSKY_GIT_PARAMS

lint-eslint:
	@node NODE_OPTIONS=--max-old-space-size=8192 scripts/lint/eslint.js

#
# TEST
#

test-dev:
	@npx nx run-many \
	--target=test \
	--all \
	--parallel \
	--silent \
	"$@"

test-ci:
	@npx nx run-many \
	--target=test \
	--all \
	--parallel \
	--maxWorkers=4 \
	--silent

#
# START
#

start-dev:
	@npx nx run-many \
	--target=serve \
	--projects=web,api \
	"$@"

start-prod:
	@pm2 startOrReload config/pm2.json