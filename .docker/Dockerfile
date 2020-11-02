FROM node:14.8.0-alpine AS base

RUN apk add bash
RUN yarn global add pm2

WORKDIR /home/codelab/app

# Opted out of .dockerignore due to performance issues
COPY package.json package.json
# Rely on build pipeline to build
COPY dist dist
# Rely on build pipeline to remove node_modules/.cache
COPY node_modules node_modules

RUN ls
RUN ls -al node_modules | head -10

# At runtime need to specify `EXPOSE`, `ENTRYPOINT`
