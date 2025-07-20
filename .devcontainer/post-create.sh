#!/bin/bash
set -e

echo "🚀 Setting up Codelab development environment..."

# Install pnpm globally
echo "📦 Installing pnpm..."
npm install -g pnpm@9.15.5

# Set up pnpm home directory
mkdir -p ~/.local/share/pnpm
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Add pnpm to shell configuration
echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.zshrc
echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.zshrc
echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.bashrc
echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.bashrc

# Install dependencies
echo "📦 Installing project dependencies..."
pnpm install

# Copy .env.example if .env doesn't exist
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "📋 Creating .env file from .env.example..."
        cp .env.example .env
    fi
fi

# Install Nx CLI globally
echo "🛠️  Installing Nx CLI..."
pnpm add -g nx@latest

# Wait for Neo4j to be ready
echo "⏳ Waiting for Neo4j to be ready..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if nc -z neo4j 7687 2>/dev/null; then
        echo "✅ Neo4j is ready!"
        break
    fi
    echo "Waiting for Neo4j... (attempt $((attempt + 1))/$max_attempts)"
    sleep 2
    attempt=$((attempt + 1))
done

if [ $attempt -eq $max_attempts ]; then
    echo "⚠️  Warning: Neo4j might not be ready yet. You may need to wait a bit more."
fi

# Build workspace libraries
echo "🔨 Building workspace libraries..."
pnpm nx run-many --target=build --projects=tag:type:util,tag:type:data --parallel=3 || echo "⚠️  Some builds failed, but continuing..."

# Set up git safe directory (for GitHub Codespaces)
git config --global --add safe.directory /workspace

echo "✅ Development environment setup complete!"
echo ""
echo "🎯 Quick start:"
echo "  - Neo4j Browser: http://localhost:7474"
echo "  - Web App: pnpm nx serve platform-web (http://localhost:3000)"
echo "  - API: pnpm nx serve platform-api (http://localhost:4000)"
echo "  - Run tests: pnpm nx test"
echo ""
echo "📚 For more information, check the README.md"