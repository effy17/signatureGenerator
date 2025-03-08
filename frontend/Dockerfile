FROM node:18-slim as build

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

COPY . .
RUN pnpm run build

# Use an Nginx server to serve the built files with custom configuration
FROM nginx:alpine
# Copy built files to Nginx root
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx config file (replace default config)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
