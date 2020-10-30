FROM node:14.8.0-alpine AS base

RUN apk add \
  bash

RUN yarn global add pm2

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV API_PORT_FEDERATION_PROPS

WORKDIR /home/codelab/app

COPY . ./
RUN ls

EXPOSE $API_PORT_FEDERATION_PROPS

ENTRYPOINT ["yarn", "start:prod:api-federation-props"]