import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import CardSkinsNavigation from "@/components/CardSkinsNavigation";
import { CardSkinsCartProvider } from "@/contexts/CardSkinsCartContext";
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
  title: "CardSkins - Premium Card Skins",
  description: "Transform your cards with our premium vinyl skins. All designs just $5 each!",
  metadataBase: new URL('https://hill-hub.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'CardSkins - Premium Card Skins',
    description: 'Transform your cards with our premium vinyl skins. All designs just $5 each!',
    url: 'https://hill-hub.com/cardskins',
    siteName: 'CardSkins',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CardSkins - Premium Card Skins',
    description: 'Transform your cards with our premium vinyl skins.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CardSkinsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CardSkinsCartProvider>
      <div className="min-h-screen flex flex-col">
        <CardSkinsNavigation />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Analytics />
    </CardSkinsCartProvider>
  );
} 