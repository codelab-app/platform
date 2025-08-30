#
# We don't use .dockerignore due to performance issues.
#
# We build `dist` with CI first before building our image, installing NPM here is require due to some packages that require native bindings.
#
# Digital Ocean app platform doesn't support pnpm, so we need to deploy with docker
# https://github.com/heroku/heroku-buildpack-nodejs/issues/688#issuecomment-1366098697
#

#
# (1) install - using alias and having multiple steps can help with caching and build speed
#
FROM node:22.14.0-alpine AS base

WORKDIR /usr/src/codelab

# Combine commands to reduce the number of layers in your Docker image, which can reduce the overhead when running containers.
# No cache reduces bundle size
RUN apk update && \
  apk add --no-cache libc6-compat python3 py3-pip make g++ jq && \
  corepack enable && \
  corepack prepare pnpm@9.15.5 --activate


FROM base AS install

COPY package.json pnpm-lock.yaml .npmrc ./
# Required for yarn workspaces
COPY dist/libs/tools ./dist/libs/tools
COPY dist/libs/external ./dist/libs/external
RUN pnpm install --frozen-lockfile


FROM install AS build

# Put this separately for caching
# The trailing / is required when copying from multiple sources
COPY nx.json .nxignore eslint.config.mjs tsconfig.base.json postcss.config.cjs tailwind.config.ts ./
COPY apps/web ./apps/web
COPY libs ./libs
COPY types ./types
COPY scripts/tailwind ./scripts/tailwind
COPY scripts/eslint ./scripts/eslint

# It's important to remember that for every --build-arg parameter used in the docker build command, there must be a corresponding ARG instruction in the Dockerfile
ARG NEXT_PUBLIC_WEB_HOST
ARG NEXT_PUBLIC_API_PORT
ARG NEXT_PUBLIC_API_HOSTNAME
ARG NEXT_PUBLIC_BASE_API_PATH
ARG AUTH0_SECRET
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID
ARG AUTH0_CLIENT_SECRET
ARG NX_CLOUD_ACCESS_TOKEN

# Then pass from ARG to ENV
#
# https://stackoverflow.com/questions/60450479/using-arg-and-env-in-dockerfile
#
# What this means is, if the ENV and ARG have the same name, the ENV will overwrite the value of the ARG after the ENV line. Before the ENV line, the ARG value will be used.
ENV NEXT_PUBLIC_WEB_HOST=$NEXT_PUBLIC_WEB_HOST
ENV NEXT_PUBLIC_API_PORT=$NEXT_PUBLIC_API_PORT
ENV NEXT_PUBLIC_API_HOSTNAME=$NEXT_PUBLIC_API_HOSTNAME
ENV NEXT_PUBLIC_BASE_API_PATH=$NEXT_PUBLIC_BASE_API_PATH
ENV AUTH0_SECRET=$AUTH0_SECRET
ENV AUTH0_DOMAIN=$AUTH0_DOMAIN
ENV AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
ENV AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET
ENV NEXT_TELEMETRY_DISABLED=1

# Enable Nx Cloud for caching
ENV NX_CLOUD_ACCESS_TOKEN=$NX_CLOUD_ACCESS_TOKEN

# Enable maximum Nx debug logging to diagnose cache issues
# This will show computation hash, cache miss reasons, and inputs changed
ENV NX_VERBOSE_LOGGING=true
ENV NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT=0
ENV NX_DAEMON=false
# Add more detailed cache debugging
ENV NX_CACHE_DIRECTORY=/usr/src/codelab/.nx/cache
ENV NX_CLOUD_DEBUG=true
# This helps show what's being included in the hash computation
ENV NX_PERF_LOGGING=true

WORKDIR /usr/src/codelab

# NX cache doesn't take into account environment variables
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Run with additional debugging flags
# First, let's see what Nx thinks the inputs are
RUN echo "=== Environment Variables ===" && \
    env | grep -E "^(NEXT_PUBLIC_|NODE_ENV|NX_)" | sort && \
    echo "=== Checking Nx inputs ===" && \
    pnpm nx show project web --json | jq '.targets.build.inputs' && \
    echo "=== Computing hash for web:build ===" && \
    pnpm nx hash web:build --verbose && \
    echo "=== Checking affected projects ===" && \
    pnpm nx affected:graph --target=build --verbose && \
    echo "=== Running build with maximum cache debugging ===" && \
    pnpm nx build web --verbose --skip-nx-cache=false 2>&1 | tee build.log && \
    echo "=== Extracting cache miss information ===" && \
    grep -E "computation hash|cache miss|inputs changed|Hash mismatch|File changed|Cache key|NX Cloud" build.log || true && \
    echo "=== Checking local cache entries ===" && \
    ls -la .nx/cache 2>/dev/null | head -20 || true || \
    (echo "Build failed, checking Nx report..." && \
     cat node_modules/.cache/nx/d/daemon.log 2>/dev/null || true && \
     cat .nx/report.json 2>/dev/null || true && \
     exit 1)

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
CMD ["pnpm", "next", "start", "dist/apps/web"]

