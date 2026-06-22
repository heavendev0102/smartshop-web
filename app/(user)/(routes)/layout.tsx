"use client";
import Cart from "../_components/Cart";
import { useState } from "react";
import { usePathname } from "next/navigation";
import MiniCart from "../_components/MiniCart";
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const pathname = usePathname();
    const showMiniCart =
        pathname.startsWith("/ProductDetail") ||
        pathname.startsWith("/Catalog");
    return (

        <>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            {children}
            {showMiniCart && <MiniCart />}

        </>
    );
}
