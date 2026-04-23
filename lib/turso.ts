import { createClient } from "@libsql/client/web";

// In Cloudflare, environment variables might not be available on process.env in some contexts.
// We use a getter function to ensure we always try to pull the latest values.
export function getTursoConfig() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url && process.env.NODE_ENV === "production") {
    // This will help us see in Cloudflare logs exactly what is happening
    console.error("CRITICAL: TURSO_DATABASE_URL is missing at runtime.");
  }

  return {
    url: url || "libsql://build-time-dummy.turso.io",
    authToken: authToken || "",
  };
}

const config = getTursoConfig();

export const turso = createClient({
  url: config.url,
  authToken: config.authToken,
});
