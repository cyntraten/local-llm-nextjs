import path from "node:path";
import { defineConfig } from "@prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: path.resolve("src/shared/lib/prisma/schema.prisma"),
  migrations: {
    path: path.resolve("src/shared/lib/prisma/migrations"),
    seed: `ts-node --compiler-options {\"module\":\"CommonJS\"} src/shared/lib/prisma/seed.ts`,
  },
});
