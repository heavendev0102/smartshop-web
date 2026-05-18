"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useCartStore from "@/app/store/cartStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { openCart } = useCartStore();

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1);

  }, []);
  const handleCartClick = () => {
    const isProductPage =
      pathname.startsWith("/user/ProductDetail") ||
      pathname.startsWith("/user/Catalog");

    if (isProductPage) {
      openCart();
    } else {
      router.push("/user/Cart");
    }
  };
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const TotalQty = useCartStore((state) => state.getTotalQty());
  return (
    <nav className="bg-neutral-primary w-full border-b border-default">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">


        <span className="text-xl md:text-2xl font-bold text-heading">Cyber</span>


        <div className="hidden md:block relative w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search" className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-full focus:outline-none" />
        </div>


        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>


        <ul className="hidden md:flex items-center gap-6 font-medium">
          {["Home", "About", "Contact", "Blog"].map((item) => (
            <li key={item}>
              <Link
                href={`/user/${item}`}
                className={`tracking-tight ${pathname === `/user/${item}`
                  ? "text-black"
                  : "text-gray-400"}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center  gap-4 pt-2">
          <Heart className="text-gray-700 cursor-pointer" />

          <div
            className="relative cursor-pointer"
            onClick={handleCartClick}
          >
            <ShoppingCart className="text-gray-700 w-6 h-6" />

            {mounted && TotalQty > 0 && (
              <div className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 bg-black text-white rounded-full flex items-center justify-center text-[13px] font-semibold">
                {TotalQty}
              </div>
            )}
          </div>

          <User className="text-gray-700 cursor-pointer" />
        </div>


      </div>


      {open && (
        <div className="md:hidden px-4 pb-4 space-y-4">


          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-full focus:outline-none"
            />
          </div>


          <ul className="flex flex-col gap-3 font-medium">
            {["Home", "About", "Contact", "Blog"].map((item) => (
              <li key={item}>
                <Link
                  href={`/user/${item}`}
                  onClick={() => setOpen(false)}
                  className={`block tracking-tight ${pathname === `/user/${item}`
                    ? "text-black"
                    : "text-gray-400"
                    }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>


          <div className="flex gap-4 pt-2">
            <Heart className="text-gray-700 cursor-pointer" />

            <div
              className="relative cursor-pointer"
              onClick={handleCartClick}
            >
              <ShoppingCart className="text-gray-700 w-6 h-6" />

              {mounted && TotalQty > 0 && (
                <div className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 bg-black text-white rounded-full flex items-center justify-center text-[13px] font-semibold">
                  {TotalQty}
                </div>
              )}
            </div>

            <User className="text-gray-700 cursor-pointer" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;