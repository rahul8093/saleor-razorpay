FROM node:18-alpine

WORKDIR /app

# Install all deps (including dev)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build (compiles TypeScript → dist)
RUN npm run build

# Remove dev dependencies for smaller image
RUN npm prune --production

EXPOSE 3000
CMD ["node", "dist/index.js"]
