# syntax=docker/dockerfile:1

FROM node:26-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:26-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json tsconfig.json ./
COPY src ./src
RUN npm run build \
  && npm prune --omit=dev

FROM node:26-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

RUN addgroup -S tourvibe && adduser -S tourvibe -G tourvibe \
  && mkdir -p /app/uploads \
  && chown -R tourvibe:tourvibe /app

COPY --from=build --chown=tourvibe:tourvibe /app/package.json ./
COPY --from=build --chown=tourvibe:tourvibe /app/package-lock.json ./
COPY --from=build --chown=tourvibe:tourvibe /app/node_modules ./node_modules
COPY --from=build --chown=tourvibe:tourvibe /app/dist ./dist
COPY --chown=tourvibe:tourvibe uploads/.gitkeep ./uploads/.gitkeep

USER tourvibe
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||5000)+'/api/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/index.js"]
