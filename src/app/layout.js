import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReSellNavbar from "@/components/ReSellNavbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resell-Hub",
  description: "What is waste for you,may be need for someone.So help,resell,recreate.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#760031]"> <ReSellNavbar/><main className="w-[95%] mx-auto space-y-10">{children} <ToastContainer/></main><Footer/></body>
    </html>
  );
}
