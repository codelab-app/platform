#
# We don't use .dockerignore due to performance issues.
#
# We build `dist` with CI first before building our image, installing NPM here is require due to some packages that require native bindings.
#
# Digital Ocean app platform doesn't support pnpm, so we need to deploy with docker
# https://github.com/heroku/heroku-buildpack-nodejs/issues/688#issuecomment-1366098697
#

#
# (1) install - using alias and having multiple steps can help with caching and build speed
#
FROM node:18.17-alpine AS base

RUN echo $DOCKER_BUILDKIT

WORKDIR /usr/src/codelab

# Combine commands to reduce the number of layers in your Docker image, which can reduce the overhead when running containers.
# No cache reduces bundle size
RUN apk update && \
  apk add --no-cache libc6-compat python3 py3-pip make g++ && \
  corepack enable && \
  corepack prepare pnpm@8.15.0 --activate


FROM base AS install

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile


FROM install as build

# Put this separately for caching
# The trailing / is required when copying from multiple sources

COPY nx.json tsconfig.base.json postcss.config.js tailwind.config.js ./
# Required for yarn workspaces
COPY dist/libs/tools ./dist/libs/tools
COPY apps/web ./apps/web
COPY libs ./libs
COPY types ./types

# It's important to remember that for every --build-arg parameter used in the docker build command, there must be a corresponding ARG instruction in the Dockerfile
ARG NEXT_PUBLIC_WEB_HOST
ARG NEXT_PUBLIC_API_PORT
ARG NEXT_PUBLIC_API_HOSTNAME
ARG AUTH0_SECRET
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID
ARG AUTH0_CLIENT_SECRET

# Then pass from ARG to ENV
#
# https://stackoverflow.com/questions/60450479/using-arg-and-env-in-dockerfile
#
# What this means is, if the ENV and ARG have the same name, the ENV will overwrite the value of the ARG after the ENV line. Before the ENV line, the ARG value will be used.
ENV NEXT_PUBLIC_WEB_HOST=$NEXT_PUBLIC_WEB_HOST
ENV NEXT_PUBLIC_API_PORT=$NEXT_PUBLIC_API_PORT
ENV NEXT_PUBLIC_API_HOSTNAME=$NEXT_PUBLIC_API_HOSTNAME
ENV AUTH0_SECRET=$AUTH0_SECRET
ENV AUTH0_DOMAIN=$AUTH0_DOMAIN
ENV AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
ENV AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /usr/src/codelab

RUN pnpm nx build web --verbose

#
# (2) Prod
#
FROM node:18.17-alpine AS prod

RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
# RUN apk add curl

WORKDIR /usr/src/codelab

# Ignore specs from image

COPY --from=build /usr/src/codelab/dist ./dist
COPY --from=install /usr/src/codelab/package.json ./
COPY --from=install /usr/src/codelab/node_modules ./node_modules

# default commands and/or parameters for a container
# CMD can be fully overridden via CLI
# ENTRYPOINT can only be extended via CLI
CMD ["pnpm", "next", "start", "dist/apps/web"]

