# Codegen

[Back](../../README.md)

The power of GraphQL comes from it's static type system, and it converts to Typescript quite nicely.

We configure `codegen.yml` using [GraphQL Code Generator](https://graphql-code-generator.com), & call `make generate-graphql` to add files to `@codelab/state/apollo` package.

All our queries & mutations will be defined in `apps/api/gateway/src/assets`. These will be generated so we can import into our React frontend.

There are multiple ways we can benefit from codegen

## Codegen

- Make sure our GraphQL server is running first, otherwise it won't work
- `make generate-graphql` will generate files into `@codelab/state/apollo` for usage
- `make generate-graphql-watch` to watch for changes
- These contain mostly Typescript interfaces generated from GraphQL schema
- We also generate a `hasura-schema.graphql`, which uses remote schema introspection to download our schema
- This can be used by Webstorm IDE for `.graphql` file linting

## GraphQL Input, Enums, Types

These GraphQL types generate a Typescript counter-part, allowing us type safety without having to write extra code

## Apollo Next SSR

The `graphql-codegen-apollo-next-ssr` plugin allows us to load data using SSR, making them available for the page.
