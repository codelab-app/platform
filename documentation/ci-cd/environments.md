# Environments

We have 5 total environments the project can run in

## development

This is local development, env is managed by `.env.dev`

## ci

This is CircleCI's environment, current all variables must be added via CircleCI's UI. We'll migrate over to Vault for management.

## e2e

This is deployed on Kubernetes, database is cleared each time to run e2e tests. We provision database using Docker with more control.

## staging

This is deployed on Kubernetes, database is kept across deploy. Database provisioned Digital Ocean to be as close to production as possible.

## production

This is deployed on Kubernetes. We use at least 2 nodes.
