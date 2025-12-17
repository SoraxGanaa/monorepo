# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /repo
RUN corepack enable

ENV NX_DAEMON=false
ENV CI=true

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./
RUN pnpm install --frozen-lockfile

COPY . .

# Next standalone-ийн гол нь энэ 2 setting
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm nx reset
RUN pnpm nx build frontend --configuration=production
RUN ls -la apps/frontend/.next && ls -la apps/frontend/.next/standalone || true


# ---- runtime ----
# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# ✅ standalone output нь apps/frontend/.next дээр гарна
COPY --from=build /repo/apps/frontend/.next/standalone ./
COPY --from=build /repo/apps/frontend/.next/static ./.next/static
COPY --from=build /repo/apps/frontend/public ./public

EXPOSE 3000
CMD ["node", "server.js"]



