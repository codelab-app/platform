#!/usr/bin/env bash

set -x

# BASE_DIR="${PWD}/.kubernetes"

#
# Use kustomize & apply settings
#
kubectl apply -k overlays/staging

# kustomize build overlays/staging | kubectl apply -n codelab -f -
# make -C "${BASE_DIR}" kube-apply

#
# Install external dependencies
#
# eval "${BASE_DIR}/setup/argocd.sh"
# eval "${BASE_DIR}/setup/ambassador.sh"


