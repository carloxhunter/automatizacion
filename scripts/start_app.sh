#!/bin/bash

cd /scripts
python3 prepare_app_config.py $1
./get_models.sh

cd /opt/nvidia/deepstream/deepstream-5.0/sources/apps/sample_apps/deepstream-app
./deepstream-app -c /config/app_config.txt
