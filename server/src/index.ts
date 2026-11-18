import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { ensureAdminFromEnv } from "./utils/ensureAdmin.js";
import { seedDatabase } from "./utils/seedData.js";

async function bootstrap(): Promise<void> {
  await connectDB();
  await seedDatabase();
  await ensureAdminFromEnv();

  app.listen(env.PORT, () => {
    console.log(`API is running on ${env.PORT}`)
  });
}

bootstrap().catch(() => {
  process.exit(1);
});
