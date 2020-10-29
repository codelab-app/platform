# Data Flow

[Back](../../README.md)

There are many ways to structure our application state. Here is a suggestion.

We load GraphQL data via SSR using the codegen components, `pages/graphql.tsx` has an example.

We use a `withApollo` hoc to accomplish this. We could also have a `withMachine` or `withActor` hoc, which we can populate data from graphql.

UI will always interact with XState, while GraphQL communicates between XState and backend.