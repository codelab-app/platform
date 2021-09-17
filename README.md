# **What is Codelab**.ai

Codelab.ai is a cloud-based SaaS product designed for developers to build frontend web applications.

- create the view by configuring ui components
- configure external data store & map them to a data transformer
- bind transformed external data to the view

The end product is a highly configurable UI layer that competes with writing code.

## Getting Started

1. Copy `.env` from slack #resources channel
2. `yarn`
3. `yarn docker:up alpha` starts Dgraph server
4. `nx serve api`
5. `nx serve web`

## Testing

1. `yarn docker:up alpha-test`
1. Copy `.env.test` from slack #resources channel
1. `nx test [project] --runInBand`

## E2e

1. `./scripts/nx.sh e2e web-e2e --configuration dev`, custom script loads `.env.test` before starting nx
