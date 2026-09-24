import { Pool } from "pg";

// Global database connection pool for PostgreSQL on port 5433 (GasPipeline)
const globalForDb = globalThis as unknown as { pool?: Pool };

function sanitizeDatabaseUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  let clean = url.trim();
  // Strip surrounding quotes if present
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1).trim();
  }
  // Auto-correct user[password]@ -> user:password@
  clean = clean.replace(/([a-zA-Z0-9_.]+)\[(.*?)\]@/, (_m, user, pwd) => `${user}:${encodeURIComponent(pwd)}@`);
  // Auto-correct user:[password]@ -> user:password@
  clean = clean.replace(/:\[(.*?)\]@/, (_m, pwd) => `:${encodeURIComponent(pwd)}@`);
  // Auto-encode unencoded '#' in password
  clean = clean.replace(/:([^:@/]+)#([^@]+)@/, (_m, p1, p2) => `:${p1}%23${p2}@`);
  return clean;
}

const connectionString = sanitizeDatabaseUrl(process.env.DATABASE_URL);

const isServerless = !!process.env.VERCEL || process.env.NODE_ENV === "production";

export const pool =
  globalForDb.pool ??
  (connectionString
    ? new Pool({
        connectionString,
        ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
        max: isServerless ? 2 : 10,
        idleTimeoutMillis: 10000,
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
