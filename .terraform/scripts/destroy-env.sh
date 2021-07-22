#!/bin/bash

. .env

terraform init

terraform workspace select default

terraform destroy -auto-approve -parallelism=3