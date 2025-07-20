# Tahap 1: Build aolikasi React
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Ganti VITE_BACKEND_URL dengan URL API backend Anda saat proses build
# Kita akan atur ini di cloudbuild.yaml nanti
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build

# Tahap 2: Sajikan file statis dengan Nginx
FROM nginx:stable-alpine
# Salin hasil build dari tahap sebelumnya
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx secara default akan menyajikan file dari direktori ini
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
