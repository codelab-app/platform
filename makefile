#!make

.PHONY: %

# NODE_OPTIONS_DEV=NODE_OPTIONS=--max-old-space-size=2048

#
# TERRAFORM
#

terraform-lint:
	terraform fmt -recursive .terraform && tflint .terraform

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
		--maxWorkers=2 \
		--parallel

build-dev:
	npx nx run-many \
	--target=build \
	--maxWorkers=2 \
	--all \
	--parallel

build-ci:
	npx nx run-many \
		--target=build \
		--projects=api,web,cli \
		--prod \
		--parallel \
		--maxWorkers=8 \
		--memoryLimit=8192

build-prod:
	npx nx run-many \
		--target=build \
		--projects=web,api-gateway,api-services-props \
		--with-deps \
		--parallel

build-storybook:
	npx nx build-storybook web

#
# LINT
#

lint-commit-ci:
	npx commitlint --from="${CIRCLE_BASE_REVISION}" --to="${CIRCLE_REVISION}"

lint-eslint:
	yarn affected:lint && npx prettier --check '**/*.{graphql,yaml}'


#
# E2E
#

start-ci:
	npx concurrently \
		--names=web,api \
			"npx next start -p 3000 dist/apps/web" \
			"node dist/apps/api/main.js"

e2e-dev:
	yarn cli e2e --env local

#
# INTEGRATION TESTS
#
integration-dev:
	npx nx-test-env run-many \
	--target=test \
	--maxWorkers=2 \
	--memoryLimit=4096 \
	--testPathPattern=i.spec.ts \
	--runInBand \
	--all

integration-dev-affected:
	yarn nx-test-env affected:test \
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
	--memoryLimit=8192

#
# TEST (ALL)
#
test-dev-affected:
	npx concurrently \
		--names=unit,int \
 		"make unit-dev-affected" \
		"make integration-dev-affected"

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
	--maxWorkers=8 \
	--memoryLimit=8192 \
	--verbose

