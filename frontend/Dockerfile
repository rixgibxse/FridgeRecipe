# TAHAP 1: BUILD APLIKASI REACT
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build

# TAHAP 2: SIAPKAN SERVER NGINX
FROM nginx:stable-alpine
# Install 'gettext' untuk envsubst DAN 'dos2unix' untuk memperbaiki line endings
RUN apk add --no-cache gettext dos2unix

# Salin hasil build dari tahap sebelumnya
COPY --from=build /app/dist /usr/share/nginx/html

# Salin template konfigurasi Nginx
COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Salin startup script
COPY ./entrypoint.sh /entrypoint.sh
# Perbaiki line endings DAN berikan izin eksekusi
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

# Jalankan startup script saat container dimulai
ENTRYPOINT ["/entrypoint.sh"]