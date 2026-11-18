import { User } from "../models/User.js";

export const DEMO_TRAVELER_EMAIL = "traveler@tourvibe.com";
export const DEMO_TRAVELER_PASSWORD = "Traveler@123";

export async function ensureDemoTraveler(): Promise<void> {
  const existing = await User.findOne({ email: DEMO_TRAVELER_EMAIL }).select(
    "+password",
  );

  if (!existing) {
    await User.create({
      name: "Ayesha Rahman",
      email: DEMO_TRAVELER_EMAIL,
      password: DEMO_TRAVELER_PASSWORD,
      role: "user",
      phone: "+8801811223344",
      bio: "Dhaka-based traveler exploring hill tracts and coastal weekends with TourVibe.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    });
    return;
  }

  let changed = false;

  if (existing.role !== "user") {
    existing.role = "user";
    changed = true;
  }

  const passwordMatches = await existing.comparePassword(DEMO_TRAVELER_PASSWORD);
  if (!passwordMatches) {
    existing.password = DEMO_TRAVELER_PASSWORD;
    changed = true;
  }

  if (changed) {
    await existing.save();
  }
}
