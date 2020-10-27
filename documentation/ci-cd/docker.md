# Docker

## Env Variable

[Environment Variables](https://docs.docker.com/compose/environment-variables/) can be loaded from `.env`, then added to `environment` automatically if we don't provide the value to the key

Specify `env_file`, which defaults to directory running `docker-compose`

## Re-creating containers

Volumes don't get recreated when running `up`, we must call `down -v` first before `up` again.