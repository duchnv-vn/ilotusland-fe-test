#!bin/bash

source .env

npm run lint

# npm run build

vercel . \
    -e MONGODB_URI=$MONGODB_URI \
    -t "$VERCEL_TOKEN"
