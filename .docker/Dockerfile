FROM node:14.8.0-alpine AS base

RUN apk add \
  bash

RUN yarn global add pm2

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV EXPOSED_PORT
ENV ENTRY_COMMAND

WORKDIR /home/codelab/app

COPY . ./
RUN ls
RUN ls -al node_modules | head -10

EXPOSE $EXPOSED_PORT

ENTRYPOINT $ENTRY_COMMAND
