# Codegen

[Back](../../README.md)

The power of GraphQL comes from it's static type system, and it converts to Typescript quite nicely.

We configure `codegen.yml` using [GraphQL Code Generator](https://graphql-code-generator.com), & call `make generate-graphql` to add files to `@codelab/state/apollo` package.

All our queries & mutations will be defined in `apps/api/gateway/src/assets`. These will be generated so we can import into our React frontend.

There are multiple ways we can benefit from codegen

## GraphQL Input, Enums, Types

These GraphQL types generate a Typescript counter-part, allowing us type safety without having to write extra code

## Apollo Next SSR

The `graphql-codegen-apollo-next-ssr` plugin allows us to load data using SSR, making them available for the page.





