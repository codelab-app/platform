# CircleCI

CireclCI is triggered whenever a Pull Request in Github is created. We have 2 workflows depending on the environment. When the PR is merged with master, another CircleCI is triggered.

We apply CircleCI filters to check for which scripts to run based on filter conditions, which are controlled by current branch & tag.

## Dev

> Runs twice, once PR is created, once PR is merged with master.

`app-dev` workflow uses the `docker-node` executor, which has a faster bootup time

1. `install-and-build-workspace`
2. `lint`
3. `test`
4. `notify-success`

## Staging

> Currently this isn't enabled. But we'll want this to run alongside `dev` when a `staging-*` tag is pushed

Docker executor can't mount volumes, or use local files on remote docker environment. So
`app-staging` workflow uses the `machine-ubuntu` executor.

https://discuss.circleci.com/t/docker-compose-doesnt-mount-volumes-with-host-files-with-circle-ci/19099/4

1. `install-and-build-workspace`
2. `build-and-push-docker-image`
