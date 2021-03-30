# Getting Started

[Back](../../README.md)

1. `cp .env.example .env` & get env from Slack
2. `yarn`

- Docker services `postgres` & `postgres-test` are required, so `yarn docker:up postgres postgres-test`

## Services

### Frontend

- `nx serve web`

### Backend

- `nx serve api`

### Generator

- `yarn codegen` after you update `.graphql` files to get generate Apollo hooks

- `yarn relay` to generate Relay related files

### Hasura

We shouldn't access Hasura dashboard from `https://cloud.hasura.io/`, but instead through a localhost console using

- `yarn hasura:console`

This ensures that all migrations are tracked

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

Read more about [dev tools](5-devtools.md)
