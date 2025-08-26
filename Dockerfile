FROM node:18-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Fix permissions for binaries (especially tsc)
RUN chmod +x node_modules/.bin/*

# Build TypeScript → dist
RUN npm run build

# Prune dev deps
RUN npm prune --production

EXPOSE 3000
CMD ["node", "dist/index.js"]
