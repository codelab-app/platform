#!/usr/bin/env bash

# Print all env varibles
kubectl exec nginx-6c858cccf7-tt2fb -n demo -- printenv