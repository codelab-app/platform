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
FROM node:22.14.0-alpine AS base

WORKDIR /usr/src/codelab

# Combine commands to reduce the number of layers in your Docker image, which can reduce the overhead when running containers.
# No cache reduces bundle size
RUN apk update && \
  apk add --no-cache libc6-compat python3 py3-pip make g++ && \
  corepack enable && \
  corepack prepare pnpm@9.15.5 --activate


FROM base AS install

# Put this separately for caching
# The trailing / is required when copying from multiple sources
COPY package.json pnpm-lock.yaml .npmrc ./
# Required for yarn workspaces
COPY dist/libs/tools ./dist/libs/tools
COPY dist/libs/external ./dist/libs/external
RUN pnpm install --frozen-lockfile


FROM install AS build

# The trailing / is required when copying from multiple sources
COPY nx.json .nxignore eslint.config.mjs tsconfig.base.json postcss.config.cjs tailwind.config.ts ./
# Required for yarn workspaces
COPY apps/landing ./apps/landing
COPY libs ./libs
COPY types ./types
COPY scripts/tailwind ./scripts/tailwind
COPY scripts/eslint ./scripts/eslint

# ARG MAILCHIMP_LIST_ID
# ARG MAILCHIMP_API_KEY
# ARG MAILCHIMP_SERVER_PREFIX
# ARG NEXT_PUBLIC_INTERCOM_APP_ID
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_KEY
ARG SUPABASE_DB_PASS
ARG NX_CLOUD_ACCESS_TOKEN

# ENV NEXT_PUBLIC_INTERCOM_APP_ID=$NEXT_PUBLIC_INTERCOM_APP_ID

# NEXT_PUBLIC are injected at build time
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_KEY=$NEXT_PUBLIC_SUPABASE_KEY
ENV SUPABASE_DB_PASS=$SUPABASE_DB_PASS

# Injected at runtime
ENV MAILCHIMP_LIST_ID=$MAILCHIMP_LIST_ID
ENV MAILCHIMP_API_KEY=$MAILCHIMP_API_KEY
ENV MAILCHIMP_SERVER_PREFIX=$MAILCHIMP_SERVER_PREFIX

#
# Build
#

WORKDIR /usr/src/codelab

# Enable Nx Cloud for caching
ENV NX_CLOUD_ACCESS_TOKEN=$NX_CLOUD_ACCESS_TOKEN

# NX cache doesn't take into account environment variables
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm nx build landing --verbose

#
# (2) Prod
#
FROM node:22.14.0-alpine AS prod

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
CMD ["pnpm", "next", "start", "dist/apps/landing"]

