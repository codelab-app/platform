#!/bin/bash

. .env

terraform init

terraform destroy -auto-approve -parallelism=3