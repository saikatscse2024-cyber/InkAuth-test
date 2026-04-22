import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url && process.env.NODE_ENV === "production") {
  console.warn("TURSO_DATABASE_URL is not defined in production environment.");
}

export const turso = createClient({
  url: url || "",
  authToken: authToken || "",
});
