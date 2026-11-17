import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    title: "Packing for a Sajek winter weekend",
    excerpt:
      "Layering tips, photography essentials, and what local hosts actually recommend packing.",
    image:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1000&h=700&fit=crop",
    tag: "Hill Trails",
  },
  {
    title: "Ethics of a Sundarbans safari",
    excerpt:
      "How responsible vessels, quiet engines, and permit discipline protect mangrove wildlife.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1000&h=700&fit=crop",
    tag: "Wildlife",
  },
  {
    title: "A tea-taster’s map of Srimangal",
    excerpt:
      "From seven-layer cups to estate walks — a slow itinerary for Bangladesh’s tea capital.",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&h=700&fit=crop",
    tag: "Tea Country",
  },
];

export function BlogPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
            05 / Journal
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            Field notes from Bangladesh
          </h2>
        </div>
        <Link href="/blog" className="text-sm font-semibold text-[#0B1E3D] dark:text-amber-300">
          Read journal →
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]"
          >
            <div className="relative aspect-[16/10]">
              <Image src={post.image} alt={post.title} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-amber-600">
                {post.tag}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
