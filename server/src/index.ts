import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { seedDatabase } from "./utils/seedData.js";

async function bootstrap(): Promise<void> {
  await connectDB();
  await seedDatabase();

  app.listen(env.PORT, () => {
    console.log(`TourVibe API listening on port ${env.PORT}`);
  });
}

bootstrap().catch((error: unknown) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
