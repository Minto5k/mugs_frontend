import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import PageProvider from "@/components/PageProvider";

import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Marketplace | Mugs",
  description: "Built By SOS Dev Team",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icons/favicon.ico",
        href: "/icons/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icons/favicon.ico",
        href: "/icons/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <React.StrictMode>
          <PageProvider>{children}</PageProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
