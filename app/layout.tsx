import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { michroma } from "../app/ui/fonts"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Among Us 2",
  description: "Among us 2 | by the Exception Handlers",
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
