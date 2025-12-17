# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /repo
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json ./

COPY apps ./apps
COPY libs ./libs
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm nx build backend --configuration=production

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/package.json ./package.json
COPY --from=build /repo/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=build /repo/dist/apps/backend ./
COPY --from=build /repo/prisma ./prisma

EXPOSE 3333
CMD ["node", "main.js"]
