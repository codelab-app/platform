#!/usr/bin/env bash

set -x

#
# Install external dependencies
#
# ./setup/argocd.sh
# ./setup/ambassador.sh

#
# Use kustomize & apply settings
#
kubectl apply -k overlays/staging
