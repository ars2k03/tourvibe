import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Travel Journal",
};

const posts = [
  {
    title: "Packing for a Sajek winter weekend",
    excerpt:
      "Layering systems, battery care in cold mist, and what local hosts recommend leaving at home.",
    image:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&h=800&fit=crop",
    date: "12 Nov 2026",
    tag: "Hill Trails",
  },
  {
    title: "Ethics of a Sundarbans safari",
    excerpt:
      "Quiet engines, no night spotlighting, and why permit discipline protects mangrove wildlife.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&h=800&fit=crop",
    date: "04 Nov 2026",
    tag: "Wildlife",
  },
  {
    title: "A tea-taster’s map of Srimangal",
    excerpt:
      "Estate walks, seven-layer cups, and a soft itinerary for Bangladesh’s tea capital.",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&h=800&fit=crop",
    date: "28 Oct 2026",
    tag: "Tea Country",
  },
  {
    title: "Timing the Cox's Bazar to Saint Martin's ferry",
    excerpt:
      "Seasonal sea windows, ticket strategy, and how we buffer island day trips against delays.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    date: "19 Oct 2026",
    tag: "Coastal",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
        Journal
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
        Field notes from the road
      </h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] transition-shadow duration-300 hover:shadow-md"
          >
            <div className="relative aspect-[16/10]">
              <Image src={post.image} alt={post.title} fill className="object-cover" sizes="50vw" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-mono uppercase tracking-wider text-amber-600">
                  {post.tag}
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">{post.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
