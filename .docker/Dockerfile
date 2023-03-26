#
# We don't use .dockerignore due to performance issues.
#
# We build `dist` with CI first before building our image, installing NPM here is require due to some packages that require native bindings.
#
FROM node:16.16.0-alpine AS build

RUN apk add bash make nasm autoconf automake libtool dpkg pkgconfig libpng libpng-dev g++

WORKDIR /usr/local/codelab

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn --immutable


#
# (2) Prod
#
FROM node:16.16.0-alpine AS prod

RUN apk add curl

WORKDIR /usr/local/codelab

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
