import path from "path";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { cwd } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, d } = req.query;
  //Find the absolute path of the json directory
  const root = d ? __dirname : cwd();
  const directory = path.join(root, q?.toString() || "");
  //Read the json data file data.json
  const files = await fs.readdir(directory);
  //Return the content of the data file in json format
  res.status(200).json(JSON.stringify(files));
}
