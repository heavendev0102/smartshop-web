"use client";

import Link from "next/link";

type Props = {
  category?: string;
  company?: string;
  product?: string;
};

export default function Breadcrumb({
  category,
  company,
  product,
}: Props) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">

      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-500">

        <Link
          href="/"
          className="hover:text-black transition-colors duration-200"
        >
          Home
        </Link>

        {category && (
          <>
            <span className="text-gray-400">&gt;</span>

            <Link
              href={`/Catalog/${category}`}
              className="capitalize hover:text-black transition-colors duration-200"
            >
              {category}
            </Link>
          </>
        )}

        {company && (
          <>
            <span className="text-gray-400">&gt;</span>

            <Link
              href={`/Catalog/${category}`}
              className="capitalize hover:text-black transition-colors duration-200"
            >
              {company}
            </Link>
          </>
        )}

        {product && (
          <>
            <span className="text-gray-400">&gt;</span>

            <span className="capitalize text-black font-medium break-words">
              {product}
            </span>
          </>
        )}

      </div>
    </div>
  );
}