import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto,Montserrat,Open_Sans } from 'next/font/google'

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "No Description",
  
};

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
