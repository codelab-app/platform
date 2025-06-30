# Nx Wrapper Script

This directory contains a wrapper script for the Nx CLI that adds default flags.

## Usage

Instead of:
```bash
nx test backend-application-admin
```

Use:
```bash
./scripts/nx/nx.sh test backend-application-admin
```

The wrapper automatically adds `--output-style=stream` to all commands.

## Adding to PATH

To use `nx` directly without the path, add this to your shell profile:

```bash
alias nx='./scripts/nx/nx.sh'
```

Or add the scripts directory to your PATH:

```bash
export PATH="$PATH:$(pwd)/scripts/nx"
```

## Customizing

Edit `nx.sh` to modify the DEFAULT_FLAGS variable to add or change default flags.