import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { michroma } from "../app/ui/fonts"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amidst Us",
  description: "Amidst Us | by the Exception Handlers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={michroma.className}>{children}</body>
    </html>
  );
}
