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
# -----------------------
# Runtime stage
# -----------------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# copy deps
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/package.json ./package.json
COPY --from=build /repo/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy built backend app
COPY --from=build /repo/dist/apps/backend ./

# Prisma runtime files (schema + migrations)
COPY --from=build /repo/prisma ./prisma

EXPOSE 3333
CMD ["node", "main.js"]

