import Fastify from "fastify";
import cors from "@fastify/cors";

import prismaPlugin from "./app/plugins/prisma";
import businessRoutes from "./app/routes/business";

async function bootstrap() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });
  await app.register(prismaPlugin);
  await app.register(businessRoutes);

  await app.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
