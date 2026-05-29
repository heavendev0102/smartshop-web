"use client";
import Link from "next/link";
import { Heart, ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useCartStore from "@/app/store/cartStore";
const NAV_LINKS = ["About", "Contact", "Blog"];
interface userType {
  first_name: string;
  last_name: string;
  email: string;
  username : string;
}
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { openCart , cartItems , fetchCart} = useCartStore();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] =  useState(false);
  const [user, setUser] = useState<userType | null>(null);
  const clearCart = useCartStore(
  (state) => state.clearCart
);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      fetchCart();
      const token =  localStorage.getItem("access_token");
      const storedUser =  localStorage.getItem("user");
      setIsLoggedIn(!!token);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, 0);
  }, []);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent ) {
      if ( dropdownRef.current &&  !dropdownRef.current.contains( event.target as Node )  ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener(  "mousedown",  handleClickOutside
    );
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("redirect_after_login");
    clearCart();
    setIsLoggedIn(false);
    setShowDropdown(false);
    setMobileMenuOpen(false);
    router.push("/login");
  }

  function handleCartClick() {
    const isProductPage =
      pathname.startsWith("/ProductDetail") ||
      pathname.startsWith("/Catalog");
    if (isProductPage) {
      openCart();
    } else {
      router.push("/Cart");
    }
  }

  function renderSearchBar() {
    return (
      <div className="relative w-full md:w-64 lg:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"  size={18}  />
        <input  type="text"  placeholder="Search"  className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-full focus:outline-none"  />
      </div>
    );
  }
  function renderNavLinks(mobile = false) {
    return (
      <ul  className={  mobile  ? "flex flex-col gap-3 font-medium"  : "hidden md:flex items-center gap-6 font-medium" } >
        <li>
          <Link  href="/"  onClick={() =>  mobile && setMobileMenuOpen(false) } className={  pathname === "/"  ? "text-black"  : "text-gray-400" } > Home
          </Link>
        </li>
        {NAV_LINKS.map((item) => {
          const href = `/${item}`;
          return (
            <li key={item}> <Link  href={href} onClick={() => mobile &&  setMobileMenuOpen(false)}
                className={`flex items-center gap-2 ${ pathname === href ? "text-black"  : "text-gray-400" }`} >
                {item}
                {item === "Blog" &&
                  !isLoggedIn && (
                    <button type="button"  onClick={(e) => {  e.preventDefault(); e.stopPropagation();
                       if (mobile) {  setMobileMenuOpen(  false ); }
                        router.push("/login");
                      }}
                      className="ml-2 px-3 py-1 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Sign in
                    </button>
                  )}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  function renderUserSection() {
    return (
      <div className="relative" ref={dropdownRef}>
        <User  className="text-gray-700 cursor-pointer"  onClick={() =>  setShowDropdown((prev) => !prev)  } />
        {showDropdown && user && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-2xl shadow-lg z-50 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-semibold text-lg">
                {user.first_name ?.charAt(0)  ?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-semibold text-sm text-black">  {user.first_name + " " + user.last_name} </p>
                <p className="font-semibold text-sm text-black"> @{user.username} </p>
                <p className="text-xs text-gray-500"> {user.email}</p>
              </div>
            </div>
            <button  onClick={handleLogout} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-200" > Logout </button>
          </div>
        )}
      </div>
    );
  }

  function renderActionIcons() {
    return (
      <div className="flex items-center gap-4 pt-2">
        <Heart className="text-gray-700 cursor-pointer" />
        <div  className="relative cursor-pointer"  onClick={handleCartClick} >
          <ShoppingCart className="text-gray-700 w-6 h-6" />
          {mounted && totalQty > 0 && (
            <div className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 bg-black text-white rounded-full flex items-center justify-center text-[12px] font-semibold">  {totalQty} </div>
          )}
        </div>
        {isLoggedIn && renderUserSection()}
      </div>
    );
  }

  return (
    <nav className="bg-neutral-primary w-full border-b border-default">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link  href="/"  className="text-xl md:text-2xl font-bold text-heading" >
          SmartShop
        </Link>
        <div className="hidden md:block"> {renderSearchBar()} </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen((prev) => !prev) } >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
        {renderNavLinks()}
        <div className="hidden md:flex">  {renderActionIcons()} </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {renderSearchBar()}
          {renderNavLinks(true)}
          {renderActionIcons()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;