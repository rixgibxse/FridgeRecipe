#!/bin/sh
# Hentikan eksekusi jika ada error
set -e

echo "--- Running entrypoint.sh ---"

# Ganti placeholder di template dan buat file konfigurasi Nginx final
echo "--- Substituting PORT: ${PORT} ---"
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

echo "--- Starting Nginx ---"
# Jalankan Nginx di foreground
exec nginx -g 'daemon off;'