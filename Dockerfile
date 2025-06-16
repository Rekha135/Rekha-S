# Use the official Playwright base image with dependencies
FROM mcr.microsoft.com/playwright:v1.53.0-jammy

# Set working directory
WORKDIR /app

# Copy everything to container
COPY . .

# Install dependencies
RUN npm ci

# Run tests
CMD ["npx", "playwright", "test"]