#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo yarn
sudo pm2 kill
sudo pm2 start dist/src --watch --ignore-watch="../logs/*"