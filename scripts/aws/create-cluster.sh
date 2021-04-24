#!/usr/bin/env bash

set -e

KEY_PAIR=codelab-cluster

ecs-cli up \
  --keypair $KEY_PAIR  \
  --capability-iam \
  --size 2 \
  --instance-type t3.small \
  --tags project=tutorial-cluster,owner=raphael \
  --cluster-config tutorial \
  --ecs-profile tutorial