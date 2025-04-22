# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app source code
COPY . .

# Set build-time environment variables
ARG NEXT_PUBLIC_BACKEND_URL
ARG JWT_SECRET

# Export build args as env vars so Next.js sees them at build time
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV JWT_SECRET=$JWT_SECRET

COPY next.config.ts ./ 

# Next.js uses these at build time
RUN NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL \
    JWT_SECRET=$JWT_SECRET \
    npm run build


# Stage 2: Production image
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables (adjust based on your use case)
ENV NODE_ENV=production
ENV PORT=3000

# Pass JWT_SECRET to the runtime environment
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

# Install only production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built app and public files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Start the app
EXPOSE 3000
CMD ["npm", "start"]
