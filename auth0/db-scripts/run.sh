#!/bin/bash

set -e # quit on error
set -u # quit if we attempt to use undefined environment variable

DB_PROVIDER=supabase

DIR="$(dirname "$(readlink -f "$0")")"
AUTH0_DIR=${DIR%/db-scripts}
cd $AUTH0_DIR

ENV=../.env

dotenv -e $ENV \
    -- node ./db-scripts/$DB_PROVIDER/$1.js
