/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:y7M0WpjFCmes@ep-wispy-cherry-a59dltsp.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require',
    }
  };
  