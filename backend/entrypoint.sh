#!/bin/sh
# Menghentikan skrip jika ada perintah yang gagal
set -e

# Menunggu beberapa detik untuk memastikan database siap (opsional, tapi disarankan)
echo "--- Waiting for database to be ready ---"
sleep 5

echo "--- Running Database Migrations ---"
# Menjalankan migrasi database
npx sequelize-cli db:migrate

echo "--- Migrations Finished. Starting Server ---"
# Menjalankan perintah utama yang diberikan oleh Dockerfile CMD
# (dalam kasus ini, "node server.js")
exec "$@"