# **What is Codelab**.ai

Codelab.ai is a cloud-based SaaS product designed for developers to build frontend web applications.

- create the view by configuring ui components
- configure external data store & map them to a data transformer
- bind transformed external data to the view

The end product is a highly configurable UI layer that competes with writing code.

## Getting Started

1. `yarn docker:up alpha` starts Dgraph server
2. Copy `.env.example` to . `.env` &  replace with proper values
3. `nx serve web --with-deps`
4. `yarn tunnel` allows localhost to accept HTTP input

## Testing

1. `yarn docker:up alpha-test`
2. Copy `.env.example` to `.env.test`
3. `nx test [project] --runInBand`

## E2e

1. `nx e2e web-e2e --configuration=dev`
