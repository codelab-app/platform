# Docker

Nrwl builds a single repository with multiple services, we could create separate containers for each service, but it is simpler to have a single container that can run multiple commands.

Nrwl uses a single `package.json`, so we can't split up the dependencies per service. The `dist` folder accounts for little space in respect to `node_modules`, and having a large `node_modules` only impacts the build time, so we opt for a single container.

`docker-compose.yml` allows us to `EXPOSE` different ports, and specify `ENTRY_POINT` at runtime. All our services will use the same container, but provide different services based on runtime configs!

## Env Variable

[Environment Variables](https://docs.docker.com/compose/environment-variables/) can be loaded from `.env`, then added to `environment` automatically if we don't provide the value to the key

Specify `env_file`, which defaults to directory running `docker-compose`

## Re-creating containers

Volumes don't get recreated when running `up`, we must call `down -v` first before `up` again.

## Building Containers

`yarn docker:build [services] [...services]`

The script will `yarn --prod` then remove `node_modules/.cache` & build

## Starting Containers

`yarn docker:up [services] [...services]`
