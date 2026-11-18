import { env } from "../config/env.js";
import { User } from "../models/User.js";

export async function ensureAdminFromEnv(): Promise<void> {
  const existing = await User.findOne({ email: env.ADMIN_EMAIL }).select(
    "+password",
  );

  if (!existing) {
    await User.create({
      name: "TourVibe Admin",
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
      role: "admin",
      phone: "+8801711001122",
      bio: "TourVibe operations lead based in Dhaka.",
    });
    return;
  }

  let changed = false;

  if (existing.role !== "admin") {
    existing.role = "admin";
    changed = true;
  }

  const passwordMatches = await existing.comparePassword(env.ADMIN_PASSWORD);
  if (!passwordMatches) {
    existing.password = env.ADMIN_PASSWORD;
    changed = true;
  }

  if (changed) {
    await existing.save();
  }
}
