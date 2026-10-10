import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const metadata: Metadata = {
title: "বাজার দর",
description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
return (
  <html
    lang="bn"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="flex min-h-screen flex-col">
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
  }}
/>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </body>
  </html>
);
}
