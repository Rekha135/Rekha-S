FROM mcr.microsoft.com/playwright:v1.53.0-jammy

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Force single-worker via env (overrides config)
ENV PLAYWRIGHT_MAX_WORKERS=1

# Ensure report directory exists
RUN mkdir -p playwright-report

# Explicitly set workers=1 in CMD
CMD ["npx", "playwright", "test", "--workers=1", "--reporter=html", "--output=./playwright-report"]