#!/usr/bin/env bash

vault login $VAULT_TOKEN

data="$(vault kv get codelab/ci)"

# https://stackoverflow.com/questions/20181467/how-to-map-an-object-to-arrays-so-it-can-be-converted-to-csv

file=$(echo $data | jq -r '.data.data | to_entries[] | [.key, .value] | @csv')

while IFS=, read row;
do
  # sed to remove double quotes
  key=$(awk -F, '{print $1}' <<< $row | sed 's/\"//g')
  val=$(awk -F, '{print $2}' <<< $row | sed 's/\"//g')

  # https://stackoverflow.com/questions/16618071/can-i-export-a-variable-to-the-environment-from-a-bash-script-without-sourcing-i
  #
  # dynamic export, call `. ./scripts/vault.sh`
  exp="${key}=${val}"
  export "${exp}"
# https://stackoverflow.com/questions/13122441/how-do-i-read-a-variable-on-a-while-loop
#
# Need `""` in order to keep the new lines
done <<< "$file"

