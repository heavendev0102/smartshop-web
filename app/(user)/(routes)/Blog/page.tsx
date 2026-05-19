
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Camera,
  Watch,
  Headphones,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    color: "bg-blue-100",
  },
  {
    name: "Laptops",
    icon: Laptop,
    color: "bg-purple-100",
  },
  {
    name: "Cameras",
    icon: Camera,
    color: "bg-orange-100",
  },
  {
    name: "Smart Watches",
    icon: Watch,
    color: "bg-pink-100",
  },
  {
    name: "Headphones",
    icon: Headphones,
    color: "bg-green-100",
  },
];

const blogs = [
  {
    id: 1,
    title: "Top 5 Smartphones To Buy in 2026",
    category: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    description:
      "Discover the best flagship phones with premium cameras, battery life, and gaming performance.",
  },
  {
    id: 2,
    title: "Best Laptops For Students & Creators",
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    description:
      "Find lightweight and powerful laptops perfect for study, editing, and development.",
  },
  {
    id: 3,
    title: "Mirrorless Cameras Worth Buying",
    category: "Cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    description:
      "Explore professional mirrorless cameras for photography and cinematic video recording.",
  },
  {
    id: 4,
    title: "Smartwatch Buying Guide 2026",
    category: "Smart Watches",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop",
    description:
      "Compare fitness tracking, battery life, and premium smartwatch features before buying.",
  },
  {
    id: 5,
    title: "Best Wireless Headphones For Music Lovers",
    category: "Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Noise cancellation, bass quality, and comfort explained in this premium headphone guide.",
  },
];

 function Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <section className="bg-linear-to-r from-black to-zinc-900 text-white overflow-hidden">
        <div className="max-w-480 mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
                Tech Insights
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mt-4">
                Latest Tech
                <span className="text-gray-400"> Blogs & Reviews</span>
              </h1>

              <p className="mt-6 text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                Explore buying guides, product comparisons, reviews, and
                trending gadgets from the world of smartphones, laptops,
                cameras, headphones, and smart wearables.
              </p>

              <button className="mt-8 bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300">
                Explore Blogs
              </button>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute w-75 h-75 bg-white/10 rounded-full blur-3xl" />

              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                alt="Tech"
                width={700}
                height={700}
                className="relative z-10 rounded-[2rem] object-cover w-full max-w-150 h-75 sm:h-100 lg:h-125"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-10 lg:py-14 bg-gray-50">
        <div className="max-w-480 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-4xl font-bold text-black">
              Browse Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="group rounded-[2rem] bg-white border border-zinc-200 p-6 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-5`}
                  >
                    <Icon className="w-7 h-7 text-black" />
                  </div>

                  <h3 className="font-semibold text-lg text-black group-hover:text-zinc-700 transition-all">
                    {category.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

     
      <section className="py-12 lg:py-20">
        <div className="max-w-480 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
            {/* LEFT BIG BLOG */}
            <div className="group bg-zinc-100 rounded-[2rem] overflow-hidden cursor-pointer">
              <div className="relative h-75 sm:h-100 lg:h-125 overflow-hidden">
                <Image
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 lg:p-8">
                <span className="text-sm uppercase tracking-[0.2em] text-gray-500">
                  {blogs[0].category}
                </span>

                <h2 className="text-3xl lg:text-5xl font-bold mt-4 leading-tight">
                  {blogs[0].title}
                </h2>

                <p className="text-gray-600 mt-5 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {blogs[0].description}
                </p>

                <button className="mt-8 flex items-center gap-2 font-semibold text-black">
                  Read Article
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* RIGHT SMALL BLOGS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
              {blogs.slice(1, 3).map((blog) => (
                <div
                  key={blog.id}
                  className="group bg-white border border-zinc-200 rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-55 sm:h-75 lg:h-100 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {blog.category}
                    </span>

                    <h3 className="text-2xl font-semibold mt-3 leading-tight">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-4 line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-480 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Latest Articles
            </h2>

            <Link
              href="#"
              className="text-sm lg:text-base font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="group bg-white border border-zinc-200 rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-62.5 sm:h-93.75 lg:h-125 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    {blog.category}
                  </span>

                  <h3 className="text-2xl font-semibold mt-3 leading-tight group-hover:text-zinc-700 transition-all">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>

                  <button className="mt-6 flex items-center gap-2 font-semibold text-black">
                    Read More
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Page;