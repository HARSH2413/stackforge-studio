import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const siteUrl = "https://stackforge.studio";
const siteName = "Stackforge Studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Stackforge Studio | Affordable Custom Software, Mobile Apps & AI Solutions",
    template: "%s | Stackforge Studio",
  },

  description:
    "Stackforge Studio is a software development studio building affordable, scalable, and low-maintenance digital solutions for small businesses, startups, and growing enterprises. Custom websites, Flutter apps, AI automation & more.",

  keywords: [
    "software development studio",
    "affordable software development",
    "custom mobile app development",
    "Flutter app development",
    "AI automation solutions",
    "business management software",
    "startup MVP development",
    "computer vision engineering",
    "web development agency",
    "cost-effective software",
    "small business software",
    "inventory management app",
    "Stackforge Studio",
  ],

  authors: [{ name: "Stackforge Studio", url: siteUrl }],
  creator: "Stackforge Studio",
  publisher: "Stackforge Studio",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Stackforge Studio | Smart Digital Products Built for Business Growth",
    description:
      "Cost-effective software solutions tailored for modern businesses. Custom websites, mobile apps, AI automation, and business management systems. Built lean. Built to last.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stackforge Studio — Affordable Custom Software Development",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Stackforge Studio | Affordable Software Development Studio",
    description:
      "We build affordable, scalable digital solutions for businesses. Custom websites, mobile apps, AI automation & more. Built lean. Built to last.",
    images: ["/og-image.png"],
    creator: "@stackforgestudio",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased">
        {children}
        <Chatbot />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
