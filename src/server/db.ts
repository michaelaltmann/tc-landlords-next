import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

import { env } from "../env/server.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const logQueryDuration: Prisma.Middleware = async (params, next) => {
  /* eslint-disable */
  const before = Date.now();
  console.log(`Querying ${params.model}.${params.action}`);
  const result = await next(params);
  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );
  return result;
};
prisma.$use(logQueryDuration);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
