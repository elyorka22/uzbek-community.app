import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uzbek Community - Находите узбеков по всему миру",
  description: "Telegram Web App для объединения узбеков, живущих, учащихся или работающих за границей",
  keywords: "узбеки, сообщество, telegram, web app, diaspora",
  authors: [{ name: "Uzbek Community Team" }],
  manifest: "/manifest.json",
};

// Отдельные экспорты для viewport и themeColor (Next.js 14+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export const themeColor = '#3B82F6';

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
        
        {/* Telegram Web App скрипт */}
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
