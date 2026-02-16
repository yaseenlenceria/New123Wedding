import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

export const hasDatabase = Boolean(process.env.DATABASE_URL);
const connectionString =
  process.env.DATABASE_URL ??
  "postgres://postgres:postgres@127.0.0.1:5432/postgres";

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
