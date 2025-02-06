#
# We don't use .dockerignore due to performance issues.
#
# We build `dist` with CI first before building our image, installing NPM here is require due to some packages that require native bindings.
#
# Digital Ocean app platform doesn't support pnpm, so we need to deploy with docker
# https://github.com/heroku/heroku-buildpack-nodejs/issues/688#issuecomment-1366098697
#

#
# (1) Build - using alias and having multiple steps can help with caching and build speed
#
#
FROM node:22.13.1-alpine AS base

WORKDIR /usr/src/codelab

# Combine commands to reduce the number of layers in your Docker image, which can reduce the overhead when running containers.
# No cache reduces bundle size
RUN apk update && \
  apk add --no-cache libc6-compat python3 py3-pip make g++ && \
  corepack enable && \
  corepack prepare pnpm@8.15.0 --activate


FROM base AS install

# Put this separately for caching
# The trailing / is required when copying from multiple sources
COPY package.json pnpm-lock.yaml .npmrc ./
# Required for yarn workspaces
COPY dist/libs/tools ./dist/libs/tools
COPY dist/libs/external ./dist/libs/external
COPY data ./data
RUN pnpm install --frozen-lockfile


FROM install AS build

# The trailing / is required when copying from multiple sources
COPY nx.json .nxignore tsconfig.base.json ./
COPY apps/api ./apps/api
COPY libs ./libs
COPY types ./types

WORKDIR /usr/src/codelab

# NX cache doesn't take into account environment variables
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm nx build api --verbose --skip-nx-cache

#
# (2) Prod
#
FROM node:22.13.1-alpine AS prod

# RUN apk add curl

WORKDIR /usr/src/codelab

# Ignore specs from image

COPY --from=build /usr/src/codelab/dist ./dist
COPY --from=install /usr/src/codelab/package.json ./
COPY --from=install /usr/src/codelab/data ./data
COPY --from=install /usr/src/codelab/node_modules ./node_modules

# default commands and/or parameters for a container
CMD ["node", "dist/apps/api/main.js"]

# CMD can be fully overridden via CLI
#
# ENTRYPOINT can only be extended via CLI
# ENTRYPOINT
