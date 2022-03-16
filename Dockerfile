FROM node:16.14-buster-slim AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS installer

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
RUN pnpm store prune && rm -rf `pnpm store path`

FROM base AS builder

COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY --from=installer /app ./

RUN pnpm run build

FROM base AS runner

ENV NODE_ENV production 

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner

RUN install -o runner -g nodejs -d .cache

COPY --from=builder --chown=runner:nodejs /app ./

USER runner

CMD ["pnpm", "run", "start"]
