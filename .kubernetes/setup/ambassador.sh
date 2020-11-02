#!/usr/bin/env bash

#
# Install Ambassardor, a self-service edge management for Kubernetes
#
# https://www.getambassador.io/docs/latest/topics/install/helm/
#

# helm repo add datawire https://www.getambassador.io

# kubectl create namespace ambassador

# helm upgrade --install ambassador --namespace ambassador datawire/ambassador

# edgectl install

#
# Kubectl Method
#
# https://www.getambassador.io/docs/latest/topics/install/yaml-install/

kubectl apply -f https://www.getambassador.io/yaml/aes-crds.yaml

kubectl wait --for condition=established --timeout=90s crd -lproduct=aes

kubectl apply -f https://www.getambassador.io/yaml/aes.yaml

kubectl -n ambassador wait --for condition=available --timeout=90s deploy -lproduct=aes