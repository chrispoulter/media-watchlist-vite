#!/bin/sh
envsubst '${VITE_API_URL}' \
  < /usr/share/nginx/html/env-config.js \
  > /tmp/env-config.js
cp /tmp/env-config.js /usr/share/nginx/html/env-config.js
