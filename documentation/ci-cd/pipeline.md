# Pipeline

We have 3 stages in this pipeline. These occur in order based on certain conditions.

## `dev`

1. A developer pushes code to the repository on a feature branch, creating a PR to master triggers the beginning of the CI/CD pipeline

2. We install package dependencies and build code

3. Then lint our codebase for code style

4. And finally run unit & integration tests

5. At this point the code is ready to be merged to master

6. Once PR is approved, it is merged to master. Another `dev` pipeline is triggered

## `staging`

After step 4 in `dev`, if a git tag of `staging-*.*.*` (`staging-0.0.1`) was provided, we will trigger the staging pipeline

1. We trigger Terraform & ArgoCD to setup a `ci` Kubernetes cluster

- This setups up databases with Docker containers (not production grade), these databases are reset each time

3. We then trigger e2e testing via the `ci` cluster

- CircleCI will access `https://ci.codelab.ai`

4. After testing is complete, we use ArgoCD to setup a `staging` Kubernetes cluster

## `production`

If we used a tag of `production-*.*.*`, in addition to the `staging` flow, we will deploy to a `production` Kubernetes cluster

1. This uses Terraform & ArgoCD just like `staging`

- Accessible at `https://codelab.ai`

2. Will have monitoring, observability, logging etc setup as well, unlike `staging`
