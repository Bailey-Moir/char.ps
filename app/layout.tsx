import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "./globals.scss";
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "charps",
  description: "Bailey Moir's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
