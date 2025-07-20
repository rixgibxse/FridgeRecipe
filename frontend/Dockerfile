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
# Install 'gettext' untuk perintah 'envsubst'
RUN apk add --no-cache gettext

# Salin hasil build dari tahap sebelumnya
COPY --from=build /app/dist /usr/share/nginx/html

# Salin template konfigurasi Nginx
COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Salin dan berikan izin eksekusi pada startup script
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Jalankan startup script saat container dimulai
ENTRYPOINT ["/entrypoint.sh"]
