#
# We don't use .dockerignore due to performance issues.
#
# We build `dist` with CI first before building our image, installing production NPM here is require due to some packages that require native bindings.
#

#
# (1) Build
#
FROM node:14.15.0-alpine AS build

RUN apk add bash
RUN yarn global add pm2

WORKDIR /usr/local/codelab

COPY package.json package.json

RUN yarn --prod --frozen-lockfile

#
# (2) Prod
#
FROM node:14.15.0-alpine AS prod

WORKDIR /usr/local/codelab

COPY package.json package.json
COPY dist dist
COPY --from=build /usr/local/codelab/node_modules ./node_modules

RUN ls
RUN ls -al node_modules | head -10

# At runtime need to specify `EXPOSE`, `ENTRYPOINT`
