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
COPY package.json pnpm-lock.yaml .npmrc nx.json tsconfig.base.json postcss.config.js tailwind.config.js ./
# Required for yarn workspaces
COPY dist/libs/tools ./dist/libs/tools
COPY apps/landing ./apps/landing
COPY libs ./libs
COPY types ./types

# ARG MAILCHIMP_LIST_ID
# ARG MAILCHIMP_API_KEY
# ARG MAILCHIMP_SERVER_PREFIX
# ARG NEXT_PUBLIC_INTERCOM_APP_ID
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_KEY
ARG SUPABASE_DB_PASS

# ENV NEXT_PUBLIC_INTERCOM_APP_ID=$NEXT_PUBLIC_INTERCOM_APP_ID

# NEXT_PUBLIC are injected at build time
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_KEY=$NEXT_PUBLIC_SUPABASE_KEY
ENV SUPABASE_DB_PASS=$SUPABASE_DB_PASS

RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm nx build landing --verbose --skip-nx-cache

#
# (2) Prod
#
FROM node:18.17-alpine AS prod


RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
# RUN apk add curl

WORKDIR /usr/src/codelab

# Ignore specs from image

COPY --from=build /usr/src/codelab/dist ./dist
COPY --from=build /usr/src/codelab/package.json ./
COPY --from=build /usr/src/codelab/node_modules ./node_modules

# Injected at runtime
ENV MAILCHIMP_LIST_ID=$MAILCHIMP_LIST_ID
ENV MAILCHIMP_API_KEY=$MAILCHIMP_API_KEY
ENV MAILCHIMP_SERVER_PREFIX=$MAILCHIMP_SERVER_PREFIX

# This way Docker will expose this port to the outside
EXPOSE 4200

# default commands and/or parameters for a container
# CMD can be fully overridden via CLI
# ENTRYPOINT can only be extended via CLI
CMD ["pnpm", "next", "start", "dist/apps/landing"]

