#!/usr/bin/env bash

#
# Install Ambassardor, a self-service edge management for Kubernetes
#
# https://argoproj.github.io/argo-cd/getting_started/
#

 kubectl apply -f https://www.getambassador.io/yaml/aes-crds.yaml

 kubectl wait --for condition=established --timeout=90s crd -lproduct=aes

 kubectl apply -f https://www.getambassador.io/yaml/aes.yaml

 kubectl -n ambassador wait --for condition=available --timeout=90s deploy -lproduct=aes