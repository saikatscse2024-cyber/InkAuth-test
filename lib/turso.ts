import { createClient } from "@libsql/client/web";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url && process.env.NODE_ENV === "production") {
  console.error("CRITICAL: TURSO_DATABASE_URL is missing at runtime.");
}

export const turso = createClient({
  url: url || "libsql://build-time-dummy.turso.io",
  authToken: authToken || "",
});
