#!/bin/bash
export HOST_IP=$(ip route get 1.1.1.1 | grep -oP 'src \K\S+')
echo "IP détectée : $HOST_IP"
docker-compose up --build