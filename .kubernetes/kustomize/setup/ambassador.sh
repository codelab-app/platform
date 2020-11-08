#!/usr/bin/env bash

#
# Install Ambassardor, a self-service edge management for Kubernetes
#
# https://www.getambassador.io/docs/latest/topics/install/helm/
#

#
# (1) Helm method
#

# helm repo add datawire https://www.getambassador.io

# kubectl create namespace ambassador

# helm upgrade --install ambassador --namespace ambassador datawire/ambassador

# edgectl install

#
# (2) Kubectl Method
#
# https://www.getambassador.io/docs/latest/topics/install/yaml-install/

kubectl create namespace ambassador

kubectl apply -f https://www.getambassador.io/yaml/aes-crds.yaml

kubectl wait --for condition=established --timeout=90s crd -lproduct=aes

kubectl apply -f https://www.getambassador.io/yaml/aes.yaml

kubectl -n ambassador wait --for condition=available --timeout=90s deploy -lproduct=aes

#
# (3) Operator method - https://www.getambassador.io/docs/latest/topics/install/aes-operator/
#

# kubectl create namespace ambassador

# kubectl apply -f https://github.com/datawire/ambassador-operator/releases/latest/download/ambassador-operator-crds.yaml

# kubectl apply -n ambassador -f https://github.com/datawire/ambassador-operator/releases/latest/download/ambassador-operator.yaml