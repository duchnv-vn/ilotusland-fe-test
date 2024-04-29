#!bin/bash

source .env

if [[ $APP_ENV == 'local' ]]; then
    npm run lint
fi

vercel . \
    -e MONGODB_URI=$MONGODB_URI \
    -t "$VERCEL_TOKEN"
