# Getting Started

[Back](../../README.md)

1. `cp .env.example .env`
2. `yarn`
3. `yarn build` (this only required after a fresh clone)
4. `yarn` (links the built workspace to our monorepo)
5. `yarn docker:up [...service]`

- Docker services `hasura` & `postgres-test` are required, so `yarn docker:up hasura postgres-test`

## Frontend

- `nx serve web`

## Backend

- `nx serve codelab`

<!-- ### Dev Ops Mode

If you want to run our api services in Docker (`yarn docker:up [app]`instead of `nx serve [app]`), you'll need to make some modifications to the `.env` file before starting the services.

```
HASURA_GRAPHQL_URI=http://hasura:8080/v1/graphql
POSTGRES_HOST=postgres
```

Instead of `localhost`, docker-compose will use the service name `postgres` instead. -->

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

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

Read more about [dev tools](5-devtools.md)

## Git hooks not working

If tests aren't running pre-push, you may do the following

```
rm -rf .git/hooks/
yarn remove -W husky
yarn add -W -D husky
```
