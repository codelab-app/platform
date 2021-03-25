#!make

.PHONY: %

# NODE_OPTIONS_DEV=NODE_OPTIONS=--max-old-space-size=2048

#
# BUILD
#
lambda:
	aws lambda create-function \
		--region ap-east-1 \
		--function-name HelloWorld \
		--zip-file fileb://~/Sites/Codelab/codelab/function.zip \
		--role arn:aws:iam::810113963961:role/codelab-aws-lambda \
		--handler index.handler \
		--runtime nodejs14.x
		# --profile adminuser \
		# --timeout 10 \
		# --memory-size 1024

build-dev-affected:
	npx nx affected:build \
		--parallel

build-dev:
	npx nx run-many \
	--target=build \
	--all \
	--parallel

build-ci:
	npx nx run-many \
    --target=build \
		--projects=api,web,tools-eslint-config-codelab \
    --parallel \
		--maxWorkers=8 \
		--memoryLimit=8192 \
		--skip-nx-cache

build-prod:
	npx nx run-many \
    --target=build \
    --projects=web,api-gateway,api-services-props \
    --with-deps \
    --parallel \
    --skip-nx-cache

#
# GENERATE
#

generate-ci:
	npx nx run-many \
    --target=build \
		--projects=tools-generators-graphql,tools-generators-json-schema \
    --parallel \
		--verbose \
		--maxWorkers=8 \
		--memoryLimit=8192 \
		--skip-nx-cache

generate-graphql:
	npx graphql-codegen --config .graphqlconfig.yaml

generate-graphql-watch:
	npx graphql-codegen --config .graphqlconfig.yaml --watch "apps/api/graph/src/assets/**/*.graphql"

#
# LINT
#

lint-commit-ci:
	@echo "${CIRCLE_BASE_REVISION}"
	npx commitlint --from="${CIRCLE_BASE_REVISION}" "$@"

# Moved to commit-msg
# lint-commit-dev:
# 	npx commitlint -E HUSKY_GIT_PARAMS

lint-eslint:
	node scripts/lint/eslint.js

#
# E2E
#

e2e-dev:
	npx concurrently \
  	--kill-others \
  	--success=first \
		--names=web-e2e,api,web \
    	"npx wait-on \
				http://localhost:3001 \
				http://localhost:4001 && \
				nx run web-e2e:e2e:ci" \
			"npx env-cmd -f .env cross-env PORT=4001 \
				node dist/apps/api/main.js" \
			"npx cross-env next start -p 3001 dist/apps/web"

e2e-ci:
	npx concurrently \
  	--kill-others \
  	--success=first \
		--names=web-e2e,api,web \
    	"npx wait-on \
				http://localhost:3001 \
				http://localhost:4001 && \
				nx run web-e2e:e2e:ci" \
			"npx cross-env PORT=4001 \
				node dist/apps/api/codelab/main.js" \
			"npx next start -p 3001 dist/apps/web"
#
# INTEGRATION TESTS
#
integration-dev:
	npx nx run-many \
	--target=test \
	--maxWorkers=2 \
	--memoryLimit=4096 \
	--testPathPattern=i.spec.ts \
	--runInBand \
	--all

integration-dev-affected:
	npx nx affected:test \
	--testPathPattern=i.spec.ts \
	--maxWorkers=2 \
	--memoryLimit=4096 \
	--runInBand

integration-ci:
	npx nx run-many \
	--target=test \
	--testPathPattern=i.spec.ts \
	--all \
	--runInBand \
	--verbose \
	--maxWorkers=8 \
	--memoryLimit=8192 \
	--skip-nx-cache

#
# TEST (ALL)
#
test-dev-affected:
	npx concurrently \
		--names=unit,int,e2e \
 		"make unit-dev-affected" \
  	"make integration-dev-affected" \
  	"make e2e-dev"

test-dev:
	npx concurrently \
		--names=unit,int,e2e \
 		"make unit-dev" \
  	"make integration-dev" \
  	"make e2e-dev"

#
# UNIT TEST
#
unit-dev-affected:
	npx nx affected:test \
	--testPathPattern=[^i].spec.ts \
	--silent \
	--maxWorkers=2 \
	--memoryLimit=4096 \
	--parallel

unit-dev:
	npx nx run-many \
	--target=test \
	--testPathPattern=[^i].spec.ts \
	--parallel \
	--silent \
	--maxWorkers=2 \
	--memoryLimit=4096 \
	--all

unit-ci:
	npx nx run-many \
	--testPathPattern=[^i].spec.ts \
	--target=test \
	--all \
	--skip-nx-cache \
	--maxWorkers=8 \
	--memoryLimit=8192 \
	--verbose

start-prod:
	pm2 startOrReload config/pm2.json
