const { ORIGIN } = process.env;

if (!ORIGIN) {
  throw new Error("Missing environment variable: ORIGIN");
}
export const getDomain = () => new URL(ORIGIN);
