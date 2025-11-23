import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // Neon için doğru ayar budur
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});