#!/bin/bash

source .env

IS_LOCAL=$1

# ENCODED_DB_URL=$(echo $DB_DIRECT_CONNECT_URL | jq --slurp --raw-input --raw-output @uri)

if [[ $IS_LOCAL == "local" ]]; then
    supabase db reset --local
else
    supabase db reset --linked
fi

exit 0
