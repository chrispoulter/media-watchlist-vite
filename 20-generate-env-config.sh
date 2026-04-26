#!/bin/sh
cat > /usr/share/nginx/html/config.js << EOF
window.__ENV__ = {
  VITE_API_URL: "${VITE_API_URL}",
};
EOF
