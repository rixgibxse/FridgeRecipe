# TAHAP 1: INSTALASI DEPENDENSI
FROM node:18-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json ./
# Hanya install dependensi produksi untuk menjaga image tetap kecil
RUN npm ci --omit=dev


# TAHAP 2: BUILD FINAL IMAGE
FROM node:18-alpine

WORKDIR /app

# Salin dependensi yang sudah di-install dari tahap sebelumnya
COPY --from=deps /app/node_modules ./node_modules

# Salin sisa kode aplikasi Anda
COPY . .

# Salin entrypoint script ke dalam image
COPY entrypoint.sh ./entrypoint.sh

# Berikan izin eksekusi pada skrip tersebut
RUN chmod +x ./entrypoint.sh

# Atur entrypoint untuk menjalankan skrip startup Anda
ENTRYPOINT ["./entrypoint.sh"]

# Perintah default untuk menjalankan server Anda
# Pastikan nama file utama Anda adalah "server.js"
CMD ["node", "index.js"]