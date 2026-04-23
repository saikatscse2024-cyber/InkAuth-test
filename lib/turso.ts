import { createClient } from "@libsql/client/web";

// In Cloudflare, environment variables might not be available on process.env in some contexts.
// We use a getter function to ensure we always try to pull the latest values.
export function getTursoConfig() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url && process.env.NODE_ENV === "production") {
    console.error("CRITICAL: TURSO_DATABASE_URL is missing at runtime.");
  }

  return {
    url: url || "libsql://build-time-dummy.turso.io",
    authToken: authToken || "",
  };
}

// We use a getter to avoid initializing the client at module-load time, 
// which can cause issues during the Cloudflare bundling/build process.
let _turso: any = null;

function getTursoClient() {
  if (!_turso) {
    const config = getTursoConfig();
    _turso = createClient({
      url: config.url,
      authToken: config.authToken,
    });
  }
  return _turso;
}

// Export a proxy or a wrapper to maintain the same API while being lazy
export const turso = {
  execute: (...args: any[]) => getTursoClient().execute(...args),
  batch: (...args: any[]) => getTursoClient().batch(...args),
  transaction: (...args: any[]) => getTursoClient().transaction(...args),
  close: () => _turso?.close(),
};
