#!/bin/bash
# exit immediately
set -e
# print all commands as is
set -x

# https://hub.docker.com/_/postgres
DOCKERIMAGE="postgres:12.1";
SERVER="postgres_server";
USER="crawler";
PW="pass";
DB="crawler";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER \
  -e POSTGRES_PASSWORD=$PW \
  -e POSTGRES_USER=$USER \
  -e PGPASSWORD=$PW \
  -e POSTGRES_DB=$DB \
  -p 5432:5432 \
  -d $DOCKERIMAGE

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U $USER
echo "\l" | docker exec -i $SERVER psql -U $USER
