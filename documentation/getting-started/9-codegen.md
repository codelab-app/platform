# Codegen

[Back](../../README.md)

We heavily rely on code generators to help us connect different components of our codebase.

## `yarn generate:json`

Generates all `*Input.ts` types under `useCase` folders, these converts the backend use case requests dto can be used to generate a json schema.

This json schema can then be used as data to construct a form.

If you think about it, the form is the ui that generate the request, so it makes sense to depend our form on the backend request interface

## `yarn generate:graphql`

In our backend `useCase` folders, we also create `*.graphql` query files, which are either `mutation` or `query`.

Our client graphql query can also help us generate frontend code for us to use. A mutation query can be generated into a javascript function that accepts parameters.
