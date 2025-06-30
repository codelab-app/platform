# Sites Application

## SSL/HTTPS Configuration

This application runs with HTTPS enabled in local development. This is configured in `project.json`:

```json
"serve": {
  "executor": "@nx/next:server",
  "options": {
    ...
    "experimentalHttps": true
  }
}
```

### Why We Use HTTPS Locally

1. **Production Parity**: Running HTTPS locally ensures our development environment closely matches production, helping catch HTTPS-specific issues early.

2. **Modern Web Features**: Many modern web APIs require HTTPS, including:
   - Service Workers
   - Web Push Notifications
   - Geolocation API
   - Camera/Microphone access
   - Clipboard API
   - HTTP/2 features

3. **Security Testing**: Testing security headers, cookies with `Secure` flag, and mixed content warnings in development.

4. **Subdomain Routing**: Our preview URL feature (`{app-id}.preview.codelab.app`) requires proper HTTPS handling for subdomain-based routing.

### Local Development Setup

When running `pnpm nx serve sites`, the application starts on `https://localhost:3080` with a self-signed certificate.

For custom domain access (e.g., `codelab.test`, `codelab.dev`), we use Caddy as a reverse proxy:

1. **Caddy Configuration** (see `Caddyfile` in project root):
   - Proxies requests from `https://codelab.test` → `https://localhost:3080`
   - Handles SSL certificates automatically
   - Skips certificate verification for the self-signed cert

2. **Hosts File Configuration**:
   ```
   127.0.0.1    codelab.test
   127.0.0.1    codelab.dev
   ```

3. **Running with Caddy**:
   ```bash
   # Start the sites app
   pnpm nx serve sites
   
   # In another terminal, run Caddy
   caddy run --config Caddyfile
   ```

### Troubleshooting

- If you see certificate warnings, accept the self-signed certificate in your browser
- Ensure no other services (like nginx) are using ports 80/443
- Check that your `/etc/hosts` file has the correct entries
- The app runs on HTTPS, so direct curl commands should use `https://localhost:3080`