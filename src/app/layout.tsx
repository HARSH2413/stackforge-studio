import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const siteUrl = "https://noryant.com";
const siteName = "Noryant";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Noryant | Affordable Custom Software, Mobile Apps & AI Solutions",
    template: "%s | Noryant",
  },

  description:
    "Noryant is a growing software development studio building affordable, scalable, and low-maintenance digital solutions for businesses ready to grow. Custom websites, Flutter apps, AI automation & more.",

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
    "Noryant",
  ],

  authors: [{ name: "Noryant", url: siteUrl }],
  creator: "Noryant",
  publisher: "Noryant",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Noryant | Smart Digital Products Built for Business Growth",
    description:
      "Cost-effective software solutions tailored for modern businesses. Custom websites, mobile apps, AI automation, and business management systems. Practical digital solutions for modern businesses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noryant — Affordable Custom Software Development",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Noryant | Affordable Software Development Studio",
    description:
      "We build affordable, scalable digital solutions for businesses. Custom websites, mobile apps, AI automation & more. Practical digital solutions for modern businesses.",
    images: ["/og-image.png"],
    creator: "@noryant",
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
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
