import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/* const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500'],
  style: ['italic'],
  fallback: [],
  variable: '--font-roboto'
}); */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
