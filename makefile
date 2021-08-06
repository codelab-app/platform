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

# Next build hardcodes env vars into the compliation
# Since this build will be used by Cypress, we'll want to use test env
build-dev-affected:
	npx env-cmd -f .env.test nx affected:build \
    --configuration=local \
		--maxWorkers=2 \
		--parallel \

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
    --configuration=ci \
		--parallel \
		--maxWorkers=8 \
		--memoryLimit=8192

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

e2e-dev-affected:
	./scripts/nx.sh affected:e2e --configuration local

e2e-ci-affected:
	yarn affected:e2e --configuration ci

#
# INTEGRATION TESTS
#
integration-dev-affected:
	./scripts/nx.sh affected:test \
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

unit-ci:
	npx nx run-many \
    --testPathPattern=[^i].spec.ts \
    --target=test \
    --all \
    --maxWorkers=8 \
    --memoryLimit=8192 \
    --verbose

