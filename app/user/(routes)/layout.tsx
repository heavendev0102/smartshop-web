"use client";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Cart from "../_components/Cart";
import { useState } from "react";
import { usePathname } from "next/navigation";
import MiniCart from "../_components/MiniCart";
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const pathname = usePathname();

    const showMiniCart =
        pathname.startsWith("/user/ProductDetail") ||
        pathname.startsWith("/user/Catalog");
    return (

        <>
            <Navbar/>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            {children}
            {showMiniCart && <MiniCart />}
            <Footer />
        </>


    );
}
