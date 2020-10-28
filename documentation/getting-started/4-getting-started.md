# Getting Started

[Back](../../README.md)

1. `cp .env.example .env.dev`
2. Update `NEO4J_URL`, `NEO4J_USERNAME`, `NEO4J_PASSWORD` in `.env`
  - Usually is `NEO4j_URL=bolt://localhost:7687`
2. `yarn`
3. `yarn build` (this only required after a fresh clone)
4. `yarn` (links the built workspace to our monorepo)
5. `yarn docker [service ...]`
  - service can be `neo4j`, `neo4j`, `fluentd`
6. `yarn start` will run backend & frontend
  - for frontend only, run `nx serve web --with-deps --parallel`
  - for backend only, run `nx serve api-gateway --with-deps --parallel`

Read more about [dev tools](5-devtools.md)

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

## GraphQL Code Generation

Whenever `api-gateway` services, it will generate from `assets` the `.graphql` files, and put that in `libs-state-apollo` for import. This uses [GraphQL Code Generator](https://graphql-code-generator.com) to help us generate types, queries, and other useful operations.


