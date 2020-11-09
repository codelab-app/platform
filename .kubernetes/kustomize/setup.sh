#!/usr/bin/env bash

set -x

#
# Use kustomize & apply settings
#
kubectl apply -k overlays/staging

#
# Install external dependencies
#
# ./setup/argocd.sh
# ./setup/ambassador.sh


