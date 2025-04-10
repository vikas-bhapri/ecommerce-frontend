# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables (adjust based on your use case)
ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built app and public files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Start the app
EXPOSE 3000
CMD ["npm", "start"]
