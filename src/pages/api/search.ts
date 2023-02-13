import path from "path";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { cwd } from "process";
const { PrismaClient } = require("@prisma/client");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query", "warn", "error"] });
  const { q, d } = req.query;
  const s = q?.toString() || "";
  const parcels = await prisma.parcel.findMany({
    where: {
      tags: { some: { tag_value: { contains: s, mode: "insensitive" } } },
    },
    take: 10,
  });
  res.status(200).json(parcels);
}
