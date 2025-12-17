# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /repo
RUN corepack enable

ENV NX_DAEMON=false
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm nx reset
RUN pnpm nx build frontend --configuration=production

# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# ✅ next start-д next + deps хэрэгтэй → node_modules copy
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/package.json ./package.json

# ✅ build output + public
# (Nx чинийхээр apps/frontend/.next дээр гарч байна)
COPY --from=build /repo/apps/frontend/.next ./.next
COPY --from=build /repo/apps/frontend/public ./public

EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000", "-H", "0.0.0.0"]
