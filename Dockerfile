# Dependencies: Node.js, npm
# Base Image: Node.js official image 24 on alpine linux
FROM node:24-alpine3.22 AS deps
# Set working directory
WORKDIR /usr/src/app

# Install build tools and odbc dependencies early
RUN apk add --no-cache unixodbc unixodbc-dev g++ make python3 libc6-compat

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./
# Install dependencies and build tools for native modules
RUN npm install --legacy-peer-deps

# Build Stage
FROM node:24-alpine3.22 AS builder
# Set working directory
WORKDIR /usr/src/app

# Install build tools for compilation if needed
RUN apk add --no-cache unixodbc unixodbc-dev g++ make python3 libc6-compat

# Copy the dependencies from the deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# Clean up dev dependencies
RUN npm prune --production

# Create the application image
FROM node:24-alpine3.22 AS production
# Set working directory
WORKDIR /usr/src/app

# Install runtime libraries early
RUN apk add --no-cache unixodbc libc6-compat

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Set environment variables
ENV NODE_ENV=production

# Use a non-root user to run the application
USER node

# Expose the application port
EXPOSE 3015
# Start the application
CMD ["node", "dist/main.js"]