import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HillHub - Cool Tech Products Store",
  description: "Your trusted destination for cool tech products. Quality, reliability, and exceptional service - all in one place.",
  metadataBase: new URL('https://hill-hub.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'HillHub - Cool Tech Products Store',
    description: 'Your trusted destination for cool tech products. Quality, reliability, and exceptional service - all in one place.',
    url: 'https://hill-hub.com',
    siteName: 'HillHub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HillHub - Cool Tech Products Store',
    description: 'Your trusted destination for cool tech products.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
