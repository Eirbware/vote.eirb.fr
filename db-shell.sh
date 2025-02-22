#!/bin/bash

if [ -f ./.env ]; then
  export $(cat ./.env | xargs)
fi

docker exec -it vote-eirb-fr-db mongosh -u $MONGO_ROOT_USERNAME -p $MONGO_ROOT_PASSWORD --authenticationDatabase admin