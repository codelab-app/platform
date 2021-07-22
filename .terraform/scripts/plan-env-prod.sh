#!/bin/bash

. .env.prod

terraform init

terraform workspace select production

terraform plan