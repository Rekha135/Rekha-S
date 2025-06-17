FROM mcr.microsoft.com/playwright:v1.53.0-jammy

WORKDIR /app

RUN apt-get update \
 && apt-get install -y git \
 && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# clean old results
RUN rm -rf playwright-report test-results

VOLUME [ "/app/playwright-report" ]

CMD ["npx", "playwright", "test", "--workers=1", "--reporter=html", "--output=./playwright-report"]
