#!bin/bash

source .env

npm run lint

vercel . \
    -e MONGODB_URI=$MONGODB_URI \
    -t "$VERCEL_TOKEN"
