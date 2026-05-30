import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const font = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"]
})

export const metadata: Metadata = {
  title: "Quisco - Next",
  description: "Quisco - Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${font.className} antialiased bg-gray-100`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
