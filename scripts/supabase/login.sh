#!/bin/bash

source .env

supabase login \
    --name $SUPABASE_ACCESS_TOKEN_NAME \
    --token $SUPABASE_ACCESS_TOKEN \
    --no-browser
