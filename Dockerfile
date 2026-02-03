## build stage
FROM node:22 AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

## runtime stage
FROM node:22-slim AS runtime
WORKDIR /app
COPY --from=builder /build/dist /app/dist
COPY --from=builder /build/node_modules /app/node_modules
CMD ["node", "/app/dist/server.js"]