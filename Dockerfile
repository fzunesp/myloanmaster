# Stage 1: Build the Vite React Application
FROM node:23-alpine AS builder

WORKDIR /app

# Install dependencies using clean install for reliability
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the static files
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to Coolify
EXPOSE 80

# Start Nginx asynchronously
CMD ["nginx", "-g", "daemon off;"]
