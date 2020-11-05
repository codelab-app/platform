#!/bin/bash

set -e

if [[ -z $DIGITALOCEAN_TOKEN ]] ; then
    echo "Error, env DIGITALOCEAN_TOKEN is missing. Exit! "
    exit 1
fi

if [[ -z $AWS_ACCESS_KEY_ID ]] ; then
    echo "Error, env AWS_ACCESS_KEY_ID is missing. Exit!"
    exit 1
fi

if [[ -z $AWS_SECRET_ACCESS_KEY ]] ; then
    echo "Error, env AWS_SECRET_ACCESS_KEY is missing. Exit!"
    exit 1
fi


if [[ ! "$#" -eq "1" ]]; then
    echo "Invalid syntax, must be: $0 <plan|apply>"
else
    if [[ "$1" == "plan" ]]; then
        echo "Run: terraform init"
        terraform init
        echo "Run: terraform plan"
        terraform plan
    elif [[ "$1" == "apply" ]]; then
        echo "Run: terraform apply"
        terraform apply
    else
        echo "'$1' is not supported. Exit!"
        exit 1
    fi
fi
