#!/usr/bin/env bash

yarn codegen

make hasura-migrations-apply

make hasura-metadata-apply
