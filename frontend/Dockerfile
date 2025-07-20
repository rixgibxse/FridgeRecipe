# TAHAP 1: BUILD APLIKASI REACT
FROM node:18-alpine AS build
WORKDIR /app

# 1. Salin hanya package manifests
COPY package.json package-lock.json ./

# 2. Gunakan 'npm ci' untuk instalasi yang lebih cepat dan konsisten
RUN npm ci

# 3. Salin sisa source code aplikasi
COPY . .

# 4. Setel argumen build untuk URL backend
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# 5. Build aplikasi
RUN npm run build

# TAHAP 2: SIAPKAN SERVER NGINX
FROM nginx:stable-alpine

# Hapus konfigurasi default Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Salin template konfigurasi kustom Anda
COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Install 'gettext' untuk envsubst DAN 'dos2unix' untuk memperbaiki line endings
RUN apk add --no-cache gettext dos2unix

# Salin hasil build dari tahap sebelumnya
COPY --from=build /app/dist /usr/share/nginx/html

# Salin startup script
COPY --from=build /app/entrypoint.sh /entrypoint.sh

# ===== PERUBAHAN DI SINI =====
# Lakukan operasi file sebagai ROOT sebelum beralih user
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

# Berikan izin yang benar untuk user nginx
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid

# Sekarang baru beralih ke user non-root untuk keamanan saat runtime
USER nginx

# Jalankan startup script saat container dimulai
ENTRYPOINT ["/entrypoint.sh"]