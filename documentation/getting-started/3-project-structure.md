# Project Structure

[Back](../../README.md)

## Apps

`/apps` Contain main user-facing applications like web frontend, api backend, & e2e tests.

- `api-gateway` is our Apollo Federation endpoint, which combines multiple GraphQL endpoints
- `api-services` contains GraphQL micro-services
- `web` is our web entry into the application

## Libs

`/libs` contain libraries that is used by apps

- `api`: contain Nest.js modules that is imported into `/apps/api`
- `core`: contain our domain specific business logic

<!-- [Graph](libs/core/graph/README.md) -->
<!-- [Model](libs/core/model/README.md) -->
<!-- [Node](libs/core/node/README.md) -->

[Props](../../libs/core/props/README.md)

<!-- [Traversal](libs/core/traversal/README.md) -->
<!-- [Tree](libs/core/tree/README.md) -->

- `shared`: contain interface & other shared code, contain no external dep
- `tools`: contain ci/cd & workspace related code

The project directory structure is based on NX, with `apps` directory containing all the user facing sites, while `libs` containing all imported libraries
