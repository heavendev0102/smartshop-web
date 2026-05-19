"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/(user)/_components/Navbar";
import Footer from "@/app/(user)/_components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}