# backend/src/webhook/bulkUploadServer/Dockerfile

FROM node:18-slim

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package*.json ./
RUN pnpm install

# Copy all your source code (since your Docker build context is /backend,
# this COPY brings in everything from backend/ into /app)
COPY . .

EXPOSE 4000

# If you want to run the server via ts-node:
CMD ["npx", "ts-node", "src/webhook/bulkUploadServer/simpleWebhookServer.ts"]

# Alternatively, if you compile TypeScript first,
# you'd do something like "npm run build" and then run the compiled JS.
