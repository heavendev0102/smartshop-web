"use client";

import { useEffect, useState } from "react";
import Image from "next/image";


import api from "@/app/util/apiClient";
import { Blog } from "@/app/util/type";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchBlogs = async () => {
    try {
      const response = await api.get(
        "/api/v1/blogs"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchBlogs();
    }, 0)

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Latest Blogs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
           
          >
            <div className="relative h-60">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">

              <h2 className="text-xl font-bold mb-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {
                  blog.short_description
                }
              </p>

              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {blog.author}
                </span>

                <span>
                  {new Date(
                    blog.created_date
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}