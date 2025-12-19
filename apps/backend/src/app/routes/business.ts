import { FastifyPluginAsync } from "fastify";
import { BusinessListResponseSchema } from "@yellow/contract"; 

const businessRoutes: FastifyPluginAsync = async (app) => {
  app.get("/api/business", async (req, reply) => {
    const data = await app.prisma.business.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    const payload = { data };
    const parsed = BusinessListResponseSchema.safeParse(payload);

    if (!parsed.success) {
      app.log.error(parsed.error);
      return reply.code(500).send({ message: "Response validation failed" });
    }

    return parsed.data;
  });
};

export default businessRoutes;
