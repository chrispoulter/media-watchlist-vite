{
  echo "window.__ENV__ ||= {"
  echo "  VITE_API_URL: \"${VITE_API_URL}\","
  [ -n "${VITE_SENTRY_DSN}" ] && echo "  VITE_SENTRY_DSN: \"${VITE_SENTRY_DSN}\","
  echo "};"
} > /usr/share/nginx/html/env.js