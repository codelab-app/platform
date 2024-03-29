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
FROM node:18.17-alpine AS build

# RUN apk add bash make nasm autoconf automake libtool dpkg pkgconfig libpng libpng-dev g++
RUN apk update
# No cache reduces bundle size
RUN apk add --no-cache libc6-compat python3 py3-pip make g++
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /usr/src/codelab

# The trailing / is required when copying from multiple sources
COPY package.json pnpm-lock.yaml .npmrc nx.json tsconfig.base.json ./
# Required for yarn workspaces
COPY dist/libs/tools ./dist/libs/tools
COPY apps/platform-api ./apps/platform-api
COPY libs ./libs
COPY types ./types

RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm nx build platform-api --verbose --skip-nx-cache

#
# (2) Prod
#
FROM node:18.17-alpine AS prod

# RUN apk add curl

WORKDIR /usr/src/codelab

# Ignore specs from image

COPY --from=build /usr/src/codelab/dist ./dist
COPY --from=build /usr/src/codelab/package.json ./
COPY --from=build /usr/src/codelab/node_modules ./node_modules

# default commands and/or parameters for a container
CMD ["cd dist/apps/platform-api", "node main.js"]

# is preferred when you want to define a container with a specific executable
# You cannot override the ENTRYPOINT instruction by adding command-line parameters, but rather append to it
# ENTRYPOINT
