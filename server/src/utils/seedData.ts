import { env } from "../config/env.js";
import { Booking } from "../models/Booking.js";
import { Category } from "../models/Category.js";
import { Contact } from "../models/Contact.js";
import { Review } from "../models/Review.js";
import { Tour } from "../models/Tour.js";
import { User } from "../models/User.js";

export async function seedDatabase(): Promise<void> {
  const tourCount = await Tour.countDocuments();
  if (tourCount > 0) {
    return;
  }

  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Tour.deleteMany({}),
    Booking.deleteMany({}),
    Review.deleteMany({}),
    Contact.deleteMany({}),
  ]);

  await User.create({
    name: "TourVibe Admin",
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
    role: "admin",
    phone: "+8801711001122",
    bio: "TourVibe operations lead based in Dhaka.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  });

  const categories = await Category.create([
    {
      name: "Hill Trails",
      slug: "hill-trails",
      description:
        "Cloud forests, tribal villages, and ridge walks across Bandarban and Sajek.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
    },
    {
      name: "Coastal Escapes",
      slug: "coastal-escapes",
      description:
        "Bay of Bengal beaches, island hopping, and sunrise walks on Cox's Bazar.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    },
    {
      name: "Wildlife & Wetlands",
      slug: "wildlife-wetlands",
      description:
        "Mangrove safaris, dolphin spotting, and conservation-led Sundarbans journeys.",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop",
    },
    {
      name: "Tea Country",
      slug: "tea-country",
      description:
        "Srimangal estates, seven-layer tea tastings, and Lawachara rainforest walks.",
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=800&fit=crop",
    },
  ]);

  const [hill, coast, wildlife, tea] = categories;

  await Tour.create([
    {
      title: "Sajek Valley Mist Ridge Expedition",
      slug: "sajek-valley-mist-ridge-expedition",
      summary:
        "Three days above the clouds in Sajek with Konglak viewpoint sunrise and local cuisine.",
      description:
        "Wake above a sea of clouds in Sajek Valley. This guided expedition blends gentle ridge walks, Konglak sunrise, and evenings with local hosts in Rangamati's hill tracts. Ideal for first-time highland travelers seeking photography-friendly vistas without technical climbing.",
      location: "Sajek Valley",
      country: "Bangladesh",
      durationDays: 3,
      durationNights: 2,
      maxGuests: 12,
      price: 12500,
      currency: "BDT",
      discountPercent: 10,
      images: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&h=900&fit=crop",
      category: hill!._id,
      difficulty: "moderate",
      highlights: [
        "Konglak sunrise viewpoint",
        "Bamboo cottage stay",
        "Guided cultural village visit",
      ],
      inclusions: [
        "AC transport from Dhaka",
        "2 nights lodging",
        "Daily breakfast and dinner",
        "Local guide",
      ],
      exclusions: ["Personal expenses", "Travel insurance", "Lunch on day 2"],
      itinerary: [
        {
          day: 1,
          title: "Dhaka to Sajek",
          description:
            "Scenic drive via Khagrachari with evening arrival and campfire dinner.",
        },
        {
          day: 2,
          title: "Ridge & Konglak",
          description:
            "Sunrise at Konglak, afternoon hill walks, and local market tasting.",
        },
        {
          day: 3,
          title: "Return journey",
          description:
            "Leisure morning photography session before returning to Dhaka.",
        },
      ],
      isFeatured: true,
      startDates: [
        new Date("2026-12-05"),
        new Date("2026-12-19"),
        new Date("2027-01-09"),
      ],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      title: "Cox's Bazar Sunrise & Island Circuit",
      slug: "coxs-bazar-sunrise-island-circuit",
      summary:
        "Four days along the world's longest beach with Inani cliffs and Saint Martin's day trip.",
      description:
        "Follow the Bay of Bengal coastline from Laboni to Inani, then sail toward Saint Martin's coral shores. This coastal circuit balances beach leisure, seafood dinners, and island exploration with professional logistics from Cox's Bazar jetty.",
      location: "Cox's Bazar",
      country: "Bangladesh",
      durationDays: 4,
      durationNights: 3,
      maxGuests: 16,
      price: 18900,
      currency: "BDT",
      discountPercent: 5,
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&h=900&fit=crop",
      category: coast!._id,
      difficulty: "easy",
      highlights: [
        "Laboni beach sunrise",
        "Inani cliff walk",
        "Saint Martin's coral island day trip",
      ],
      inclusions: [
        "3 nights seaside hotel",
        "Ferry tickets",
        "Breakfast daily",
        "Airport/bus station transfers",
      ],
      exclusions: ["Lunch and dinner", "Water sports rentals"],
      itinerary: [
        {
          day: 1,
          title: "Beach arrival",
          description: "Check-in, Laboni sunset stroll, seafood dinner briefing.",
        },
        {
          day: 2,
          title: "Inani & Himchari",
          description: "Coastal cliffs, waterfall overlook, and photography stops.",
        },
        {
          day: 3,
          title: "Saint Martin's",
          description: "Full-day island excursion with reef shoreline walk.",
        },
        {
          day: 4,
          title: "Departure",
          description: "Morning free time and transfer assistance.",
        },
      ],
      isFeatured: true,
      startDates: [new Date("2026-12-12"), new Date("2027-01-16")],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      title: "Sundarbans Tiger Trail Safari",
      slug: "sundarbans-tiger-trail-safari",
      summary:
        "Three-day mangrove cruise with wildlife spotting, forest walks, and river camping.",
      description:
        "Board a dedicated forest vessel into the UNESCO Sundarbans. Spot spotted deer, monitor lizards, and—on fortunate days—Royal Bengal Tiger signs, while certified guides lead responsible mangrove walks and night sky observations on the deck.",
      location: "Sundarbans",
      country: "Bangladesh",
      durationDays: 3,
      durationNights: 2,
      maxGuests: 20,
      price: 16500,
      currency: "BDT",
      discountPercent: 0,
      images: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&h=900&fit=crop",
      category: wildlife!._id,
      difficulty: "moderate",
      highlights: [
        "Permit-backed forest entry",
        "Guided mangrove walk",
        "River dolphin watch points",
      ],
      inclusions: [
        "Cabin berth on vessel",
        "All meals onboard",
        "Forest permits",
        "Naturalist guide",
      ],
      exclusions: ["Personal gear", "Tips"],
      itinerary: [
        {
          day: 1,
          title: "Mongla embarkation",
          description: "Safety briefing, canal cruise, evening wildlife watch.",
        },
        {
          day: 2,
          title: "Deep forest",
          description: "Morning walk, midday rest, sunset photography session.",
        },
        {
          day: 3,
          title: "Return to jetty",
          description: "Final canal stretch and disembarkation by afternoon.",
        },
      ],
      isFeatured: true,
      startDates: [new Date("2026-12-20"), new Date("2027-01-24")],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      title: "Srimangal Tea Estate Immersion",
      slug: "srimangal-tea-estate-immersion",
      summary:
        "Two nights among rolling tea gardens with Lawachara trails and Madhabpur Lake.",
      description:
        "Explore Bangladesh's tea capital with estate walks, a curated seven-layer tea tasting, and a soft trek through Lawachara National Park—home to capped langurs and towering rainforest canopy.",
      location: "Srimangal",
      country: "Bangladesh",
      durationDays: 3,
      durationNights: 2,
      maxGuests: 10,
      price: 9800,
      currency: "BDT",
      discountPercent: 8,
      images: [
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1556679343-c7306c197480?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1400&h=900&fit=crop",
      category: tea!._id,
      difficulty: "easy",
      highlights: [
        "Tea tasting workshop",
        "Lawachara rainforest walk",
        "Madhabpur Lake picnic",
      ],
      inclusions: [
        "Boutique lodge stay",
        "Breakfast and dinner",
        "Park entry fees",
        "Private guide",
      ],
      exclusions: ["Train tickets", "Personal shopping"],
      itinerary: [
        {
          day: 1,
          title: "Estate welcome",
          description: "Check-in, garden orientation, evening tea ceremony.",
        },
        {
          day: 2,
          title: "Forest & lake",
          description: "Lawachara morning trek and Madhabpur Lake afternoon.",
        },
        {
          day: 3,
          title: "Departure",
          description: "Optional early harvest walk before checkout.",
        },
      ],
      isFeatured: true,
      startDates: [new Date("2026-12-08"), new Date("2027-01-05")],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      title: "Bandarban Nilgiri & Chimbuk Heights",
      slug: "bandarban-nilgiri-chimbuk-heights",
      summary:
        "Four-day highland circuit covering Nilgiri resorts, Boga Lake, and tribal markets.",
      description:
        "Traverse Bandarban's dramatic escarpments from Nilgiri's cliff-edge lodges to the turquoise stillness of Boga Lake. Includes guided cultural exchange in local communities and a carefully paced itinerary suited to moderate fitness levels.",
      location: "Bandarban",
      country: "Bangladesh",
      durationDays: 4,
      durationNights: 3,
      maxGuests: 14,
      price: 15200,
      currency: "BDT",
      discountPercent: 0,
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=900&fit=crop",
      category: hill!._id,
      difficulty: "challenging",
      highlights: [
        "Nilgiri sunrise terrace",
        "Boga Lake trek",
        "Chimbuk viewpoint",
      ],
      inclusions: [
        "3 nights lodging",
        "Permits and local transport",
        "Breakfast and dinner",
        "Experienced trek guide",
      ],
      exclusions: ["Trekking poles rental", "Travel insurance"],
      itinerary: [
        {
          day: 1,
          title: "Arrival Nilgiri",
          description: "Transfer to cliff lodge and sunset terrace briefing.",
        },
        {
          day: 2,
          title: "Boga Lake",
          description: "Full-day guided trek with packed lunch.",
        },
        {
          day: 3,
          title: "Chimbuk & markets",
          description: "Viewpoint hop and tribal market evening.",
        },
        {
          day: 4,
          title: "Return",
          description: "Morning free time and departure to Dhaka.",
        },
      ],
      isFeatured: false,
      startDates: [new Date("2027-01-02"), new Date("2027-02-06")],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      title: "Kuakata Mother-of-the-Sea Weekend",
      slug: "kuakata-mother-of-the-sea-weekend",
      summary:
        "Two-night coastal reset with sunrise-sunset beach walks and Fatra forest visit.",
      description:
        "Kuakata is one of the few beaches in Bangladesh where both sunrise and sunset unfold over the same horizon. This short escape pairs calm beach days with a guided walk through Fatra mangrove fringe.",
      location: "Kuakata",
      country: "Bangladesh",
      durationDays: 3,
      durationNights: 2,
      maxGuests: 12,
      price: 11200,
      currency: "BDT",
      discountPercent: 12,
      images: [
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1400&h=900&fit=crop",
      category: coast!._id,
      difficulty: "easy",
      highlights: [
        "Sunrise and sunset beach ritual",
        "Fatra forest boardwalk",
        "Local seafood dinner",
      ],
      inclusions: [
        "2 nights hotel",
        "Breakfast",
        "Local transfers",
        "Guide for Fatra visit",
      ],
      exclusions: ["Lunch and dinner", "Boat rentals"],
      itinerary: [
        {
          day: 1,
          title: "Arrival & sunset",
          description: "Check-in and guided sunset walk on the main beach.",
        },
        {
          day: 2,
          title: "Fatra & leisure",
          description: "Morning forest visit, free afternoon for beach time.",
        },
        {
          day: 3,
          title: "Sunrise departure",
          description: "Optional sunrise session before checkout.",
        },
      ],
      isFeatured: false,
      startDates: [new Date("2026-12-26"), new Date("2027-01-30")],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      title: "Sylhet Ratargul Swamp Forest Day Cruise",
      slug: "sylhet-ratargul-swamp-forest-day-cruise",
      summary:
        "Full-day boat journey through freshwater swamp forest with village lunch.",
      description:
        "Glide beneath the canopy of Ratargul, Bangladesh's only freshwater swamp forest. Local boatmen navigate narrow channels while a naturalist explains seasonal ecology and birdlife.",
      location: "Sylhet",
      country: "Bangladesh",
      durationDays: 1,
      durationNights: 0,
      maxGuests: 8,
      price: 4500,
      currency: "BDT",
      discountPercent: 0,
      images: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=900&fit=crop",
      category: wildlife!._id,
      difficulty: "easy",
      highlights: [
        "Private country boat",
        "Seasonal birdwatching",
        "Village lunch stop",
      ],
      inclusions: ["Boat hire", "Guide", "Lunch", "Transfers from Sylhet city"],
      exclusions: ["Hotel stay", "Personal purchases"],
      itinerary: [
        {
          day: 1,
          title: "Full-day swamp cruise",
          description:
            "Morning pickup, boat exploration, lunch, and late-afternoon return.",
        },
      ],
      isFeatured: false,
      startDates: [new Date("2026-12-14"), new Date("2027-01-11")],
      ratingAverage: 0,
      ratingCount: 0,
    },
    {
      title: "Jaflong & Tamabil Border Hills Escape",
      slug: "jaflong-tamabil-border-hills-escape",
      summary:
        "Two-day Sylhet hills itinerary with stone collection riverbeds and panoramic border views.",
      description:
        "Stand where Bangladesh meets the Meghalaya foothills. This short escape covers Jaflong's rolling rivers, Tamabil viewpoints, and a comfortable lodge night with mountain air.",
      location: "Jaflong",
      country: "Bangladesh",
      durationDays: 2,
      durationNights: 1,
      maxGuests: 10,
      price: 7900,
      currency: "BDT",
      discountPercent: 5,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1400&h=900&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=900&fit=crop",
      ],
      coverImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop",
      category: hill!._id,
      difficulty: "easy",
      highlights: [
        "Tamabil panorama",
        "Piyain river walk",
        "Local citrus tasting",
      ],
      inclusions: [
        "1 night lodge",
        "Breakfast and dinner",
        "Private vehicle",
        "Guide",
      ],
      exclusions: ["Train to Sylhet", "Snacks"],
      itinerary: [
        {
          day: 1,
          title: "Jaflong exploration",
          description: "Riverbed walk, viewpoint stops, lodge check-in.",
        },
        {
          day: 2,
          title: "Tamabil & return",
          description: "Morning border hills visit and transfer back.",
        },
      ],
      isFeatured: true,
      startDates: [new Date("2026-12-18"), new Date("2027-01-22")],
      ratingAverage: 0,
      ratingCount: 0,
    },
  ]);

  await Contact.create([
    {
      name: "Farhana Akter",
      email: "farhana.akter@example.com",
      subject: "Corporate offsite for 18 guests",
      message:
        "Looking for a three-day Sajek or Bandarban package for our Dhaka product team in January 2027.",
      status: "new",
    },
    {
      name: "Imran Kabir",
      email: "imran.kabir@example.com",
      subject: "Private Sundarbans charter",
      message:
        "Interested in a private vessel option for a family of six with a naturalist guide.",
      status: "read",
    },
  ]);
}
