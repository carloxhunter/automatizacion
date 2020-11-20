#!/bin/bash

docker start <contenedor>
docker exec -t <contenedor> bash /scripts/start_app.sh $1
