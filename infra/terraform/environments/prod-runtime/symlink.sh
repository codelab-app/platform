#!/bin/bash
set -ex

# Remove any previous symlinks
rm -f ./*.symlink.tf || true

# prod-runtime only needs minimal configuration for Grafana dashboards
# Link only the necessary shared variables
ln -s "../shared/vars-grafana.tf" "./vars-grafana.symlink.tf"