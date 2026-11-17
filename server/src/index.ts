import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { seedDatabase } from "./utils/seedData.js";

async function bootstrap(): Promise<void> {
  await connectDB();
  await seedDatabase();

  app.listen(env.PORT);
}

bootstrap().catch(() => {
  process.exit(1);
});
