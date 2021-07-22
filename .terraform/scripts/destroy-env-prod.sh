#!/bin/bash

. .env.prod

terraform init

terraform workspace select production

terraform apply -auto-approve -parallelism=3