FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-slim
WORKDIR /app

# Install curl for health check
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy node_modules from build stage
COPY --from=build /app/node_modules ./node_modules

# Copy application code
COPY . .

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose port (this is just documentation, Cloud Run uses PORT env var)
EXPOSE 8080

# Health check - use PORT environment variable
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:${PORT:-8080}/health || exit 1

# Start application
CMD [ "npm", "start" ]