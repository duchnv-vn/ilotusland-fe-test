#!/bin/bash

source .env

npx supabase link \
    --password $SUPABASE_DB_PASSWORD \
    --project-ref $SUPABASE_PROJECT_REF
