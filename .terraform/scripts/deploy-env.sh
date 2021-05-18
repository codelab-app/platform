#!/bin/bash

. .env

terraform init

terraform apply -auto-approve -parallelism=3