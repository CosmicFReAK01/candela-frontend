import { Pool } from "pg";

// Global database connection pool for PostgreSQL on port 5433 (GasPipeline)
const globalForDb = globalThis as unknown as { pool?: Pool };

const connectionString = process.env.DATABASE_URL;

export const pool =
  globalForDb.pool ??
  (connectionString
    ? new Pool({
        connectionString,
        ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      })
    : new Pool({
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5433,
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "9906",
        database: process.env.PGDATABASE || "GasPipeline",
        ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      }));

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } finally {
    client.release();
  }
}
