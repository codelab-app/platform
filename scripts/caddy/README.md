# Caddy Local Development Proxy

This directory contains the Caddy configuration for local development with custom domains.

## Usage

1. Start the sites app:
   ```bash
   pnpm dev:sites
   ```

2. In another terminal, start Caddy:
   ```bash
   pnpm caddy
   ```

## What it does

The Caddyfile configures Caddy to:
- Proxy `https://codelab.test` → `https://localhost:3080`
- Proxy `https://*.codelab.test` → `https://localhost:3080` (for preview URLs)
- Handle SSL certificates automatically
- Skip certificate verification for the self-signed cert from Next.js

## Prerequisites

1. Install Caddy:
   ```bash
   brew install caddy
   ```

2. Add to `/etc/hosts`:
   ```
   127.0.0.1    codelab.test
   127.0.0.1    codelab.dev
   ```

## Preview URLs

With the wildcard configuration, you can access preview URLs like:
- `https://demo.codelab.test`
- `https://{app-id}.codelab.test`

This enables the production URL feature for instant app previews.