# Codelab Dev Container Configuration

This directory contains the configuration for running the Codelab platform in GitHub Codespaces or VS Code Dev Containers.

## Features

- **Full development environment** with Node.js 22, pnpm, and Nx CLI pre-installed
- **Neo4j database** running in Docker with APOC plugins enabled
- **All required VS Code extensions** pre-configured
- **Automatic port forwarding** for all services
- **Post-create setup** that installs dependencies and builds workspace libraries

## Services Included

- **Neo4j** (ports 7474, 7687) - Main database
- **Neo4j Test** (ports 7475, 7688) - Test database
- **OpenTelemetry Collector** - For observability
- **Jaeger** (port 16686) - For distributed tracing
- **LiteLLM** (port 4100) - LLM gateway proxy

## Getting Started

1. Open this repository in GitHub Codespaces or VS Code with Dev Containers extension
2. Wait for the container to build and post-create script to complete
3. The environment will be ready with:
   - All dependencies installed
   - Neo4j database running
   - Workspace libraries built

## Accessing Services

- **Neo4j Browser**: http://localhost:7474 (username: `neo4j`, password: `password`)
- **Jaeger UI**: http://localhost:16686
- **Web App**: Run `pnpm nx serve platform-web` → http://localhost:3000
- **API**: Run `pnpm nx serve platform-api` → http://localhost:4000

## Environment Variables

The dev container will use your local `.env` file if it exists. If not, it will copy `.env.example` to `.env` during setup.

## Customization

- Edit `devcontainer.json` to add more VS Code extensions or features
- Modify `docker-compose.yml` to change the app container configuration
- Update `post-create.sh` to add additional setup steps