FROM node:20-bookworm-slim

WORKDIR /app

# Native modules (bcrypt, sqlite3) need build tools at install time
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY .env .env
RUN cp .env src/.env

ENV NODE_ENV=production
EXPOSE 8000

CMD ["node", "src/app.js"]
