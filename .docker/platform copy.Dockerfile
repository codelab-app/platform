#
# We don't use .dockerignore due to performance issues.
#
# We build `dist` with CI first before building our image, installing NPM here is require due to some packages that require native bindings.
#
# Digital Ocean app platform doesn't support pnpm, so we need to deploy with docker
# https://github.com/heroku/heroku-buildpack-nodejs/issues/688#issuecomment-1366098697
#

#
# (1) Build
#
FROM node:18.17-alpine AS build

# RUN apk add bash make nasm autoconf automake libtool dpkg pkgconfig libpng libpng-dev g++
RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /usr/src/platform
COPY package.json pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile --ignore-scripts

#
# (2) Prod
#
FROM node:18.17-alpine AS prod

RUN apk add curl

WORKDIR /usr/src/codelab

# Ignore specs from image

COPY package.json package.json
COPY dist dist
COPY scripts scripts
COPY .docker .docker
COPY --from=build /usr/local/codelab/node_modules node_modules

# RUN ls node_modules

# default commands and/or parameters for a container
CMD ["node", "dist/apps/api/main.js"]

# is preferred when you want to define a container with a specific executable
# You cannot override the ENTRYPOINT instruction by adding command-line parameters, but rather append to it
# ENTRYPOINT
