#!/bin/sh

# Create env.js dynamically from environment variables
cat <<EOF > /usr/share/nginx/html/assets/env.js
window.env = {
  apiUrl: "${API_URL:-http://localhost:8000}"
};
EOF

# Start nginx
nginx -g 'daemon off;'
