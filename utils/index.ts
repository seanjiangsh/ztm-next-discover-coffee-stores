const { ORIGIN } = process.env;

if (!ORIGIN) {
  throw new Error("Missing ORIGIN environment variables");
}
export const getDomain = () => new URL(ORIGIN);
