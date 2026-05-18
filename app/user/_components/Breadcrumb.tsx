"use client";
import Link from "next/link";
type Props = {
  category?: string;
  company?: string;
  product?: string;
};

export default function Breadcrumb({ category, company, product }: Props) {
  return (
    <div className="text-md ml-37 pt-5 text-gray-500 mb-4 flex items-center gap-2">

      <Link href="/user/Home" className="hover:text-black">
        Home
      </Link>

      <span>&gt;</span>
      {category && (
        <>
          <Link href={`/user/Catalog/${category}`} className="hover:text-black">
            <span className=" capitalize">{category}</span></Link>
        </>
      )}

      {company && (
        <>
          <Link href={`/user/Catalog/${category}`} className="hover:text-black">
            <span>&gt;</span>
            <span className=" capitalize">{company}</span>
          </Link>
        </>
      )}

      {product && (
        <>
          <span>&gt;</span>
          <span className="text-black capitalize">{product}</span>
        </>
      )}

    </div>
  );
}