# Build Angular (SSR) then run the Node server. Pass your AWS API URL at build time:
# docker build --build-arg API_URL=https://your-api.example.com -t bug-track-frontend .
FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG API_URL=http://localhost:8000
RUN sed -i "s|http://localhost:8000|${API_URL}|g" src/environments/environment.ts

RUN npm run build

FROM node:20-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist/bugTrackSys ./dist/bugTrackSys

EXPOSE 4000

CMD ["node", "dist/bugTrackSys/server/server.mjs"]
