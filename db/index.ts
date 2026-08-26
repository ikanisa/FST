import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { serverEnv } from "../lib/server-env";

export function getDb() {
  const binding = serverEnv().DB;
  if (!binding) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Configure the binding in wrangler.jsonc before using the database."
    );
  }

  return drizzle(binding, { schema });
}
