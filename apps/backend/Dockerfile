# syntax=docker/dockerfile:1

# -----------------------
# Build stage
# -----------------------
FROM node:20-alpine AS build
WORKDIR /repo

# pnpm via corepack
RUN corepack enable

# Copy only the files needed to install deps first (better caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

# Copy workspace sources
COPY apps ./apps
COPY libs ./libs
COPY prisma ./prisma

# Install deps (frozen for CI)
RUN pnpm install --frozen-lockfile

# ✅ Generate Prisma client INSIDE the image
# (requires prisma/schema.prisma to be present)
RUN pnpm prisma generate

# Build backend (uses Nx)
RUN pnpm nx build backend --configuration=production

# -----------------------
# Runtime stage
# -----------------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built backend app
COPY --from=build /repo/dist/apps/backend ./

# Prisma runtime files (schema + migrations) if you plan to run migrate deploy at runtime
COPY --from=build /repo/prisma ./prisma

# If your backend reads env vars from .env, you'll pass them at runtime (docker run -e ...)
EXPOSE 3333

# Nx esbuild output usually contains main.js at dist/apps/backend/main.js
CMD ["node", "main.js"]
