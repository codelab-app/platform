#!/bin/bash

. .env

terraform init

terraform workspace select default

terraform plan