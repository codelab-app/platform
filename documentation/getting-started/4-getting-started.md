# Getting Started

[Back](../../README.md)

1. `cp .env.example .env.dev`
2. `yarn`
3. `yarn build` (this only required after a fresh clone)
4. `yarn` (links the built workspace to our monorepo)
5. `yarn docker:up [...service]`

I find that its useful to create separate terminal tabs for different commands, as opposed to combining all scripts into one. We may not need all commands to run at once, and running separate scripts give us more flexibility.

## Frontend

- `npx nx serve web`

## Backend

### Dev Ops Mode

If you want to run our api services in Docker, you'll need to make some modifications to the `.env.dev` file before starting the services.

```
CODELAB_ENV=
HASURA_GRAPHQL_URI=http://hasura:8080/v1/graphql
POSTGRES_HOST=postgres
```

Instead of `localhost`, docker-compose will use the service name `postgres` instead. `CODELAB_ENV=` must be set to none.

- `yarn docker:up hasura` this only needs to be run once, then it will run in background
- `npx nx serve api-graph`
- `npx nx serve api-graph --args="--reset"` to reset & seed database

### Seeding

```
TYPEORM_SEED=true
TYPEORM_DROP_SCHEMA=true
TYPEORM_SYNCHRONIZE=true
```

`TYPEORM_SEED` will run our custom seeder
`TYPEORM_DROP_SCHEMA` will clear the database schema
`TYPEORM_SYNCHRONIZE` will auto update our database schema with our models

If you're not modifying the models, set `TYPEORM_SEED=true`, start project, then set to false & restart

If you're working on the models, do the previous, but also set `TYPEORM_SYNCHRONIZE=true`. Use `TYPEORM_DROP_SCHEMA=true` only when some syncing doesn't work anymore

## Codegen

- Make sure our GraphQL server is running first, otherwise it won't work
- `make graphql-codegen` will generate files into `@codelab/state/apollo` for usage
- `make graphql-codegen-watch` to watch for changes
- These contain mostly Typescript interfaces generated from GraphQL schema
- We also generate a `hasura-schema.graphql`, which uses remote schema introspection to download our schema
- This can be used by Webstorm IDE for `.graphql` file linting

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

Read more about [dev tools](5-devtools.md)
