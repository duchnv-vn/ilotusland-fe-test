#!/bin/bash

source .env

supabase gen types typescript \
    --project-id $SUPABASE_PROJECT_REF >database.types.ts
