#!/bin/sh

npm i -g tsc-watch
yarn install

echo "waiting for ${MIKRO_ORM_HOST}:${MIKRO_ORM_PORT}"

cycle=0
while ! nc -z ${MIKRO_ORM_HOST} ${MIKRO_ORM_PORT}; do
    sleep 1
    cycle=$((cycle + 1))
    if [ "$cycle" -ge 60 ]; then echo "timeout"; exit 1; fi
done
echo "db online"

yarn mikro
yarn dev

