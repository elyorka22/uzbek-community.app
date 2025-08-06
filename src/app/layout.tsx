import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import TelegramInit from "@/components/TelegramInit";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uzbek Community - Находите узбеков по всему миру",
  description: "Telegram Web App для объединения узбеков, живущих, учащихся или работающих за границей",
  keywords: "узбеки, сообщество, telegram, web app, diaspora",
  authors: [{ name: "Uzbek Community Team" }],
  manifest: "/manifest.json",
};

// Отдельные экспорты для viewport (Next.js 14+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Telegram Web App мета-теги */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Uzbek Community" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={inter.className}>
        {/* Telegram Web App скрипт */}
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive"
        />
        <TelegramInit />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
