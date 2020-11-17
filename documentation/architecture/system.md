# System

These services can be accessed via `yarn docker:up [...services]`

We have a `web` service entry-point accessible at `https://codelab.ai`, which will retrieve data at the `api-graph` service.

Use `yarn docker:up web api-graph` to run the 2 applications.

<!-- The `api-gateway` service is the entry-point for all our micro-services. Currently we have `api-federation-nodes` and `api-federation-props`

We can run `yarn docker:up web api-gateway` since `depends_on` will trigger `api-federation-props` & `api-federation-nodes` as well. -->

## `web`

- hardcoded port 3000 (env actually doesn't change the port currently)

## 'api-graph`

- The only currently api for `web`

<!-- ## `api-gateway`

- depends on `api-federation-nodes` & `api-federation-props`
- acts as api gateway for our micro-services

## `api-federation-nodes`

- uses Neo4j database
- gRPC client (nodes-props)
- depends on `api-federation-props`

## `api-federation-props`

- Uses PostgreSQL database
- gRPC server (nodes-props) -->
