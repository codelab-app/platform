#!/usr/bin/env bash

#
# Install Argo CD, a declarative, GitOps continuous delivery tool for Kubernetes.
#
# https://argoproj.github.io/argo-cd/getting_started/
#

kubectl create namespace argocd

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
