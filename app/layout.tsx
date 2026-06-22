import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "sonner";
import AppShell from "@/components/AppShell";
import Provider from "./Provider";
import MiniWishlist from "./(user)/_components/MiniWishList";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SmartShop ",
  },
  description: "SmartShop electronics e-commerce project",
  keywords: ["SmartShop", "Electronics"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${josefin.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col font-sans">


        <Provider>
          <AppShell>
            {children}
            <MiniWishlist />
          </AppShell>
        </Provider>

        <Toaster position="top-right" richColors />

      </body>
    </html>
  );
}
