import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import { Toaster } from "sonner";
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
    default: "Cyber ",
  },
  description: "Cyber electronics e-commerce project",
  keywords: ["Cyber", "Electronics"]
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

      <body className="min-h-full flex flex-col font-sans">{children}
       
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
//guest checkout   -- done
//rate
//address issues update and store in local storage   --done
//profile
//wishlist
//search
//summer sale
//filtering
//sorting
//pagination

//>improve routes of guest users 
//>store delivery address in local storage and use it during checkout and also add update and delete functionality for it
//>improve UI of Home page