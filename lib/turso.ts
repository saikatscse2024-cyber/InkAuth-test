import { createClient } from "@tursodatabase/serverless/compat";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

export const turso = createClient({
  url: url || "libsql://build-time-dummy.turso.io",
  authToken: authToken || "",
});
