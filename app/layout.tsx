import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto,Montserrat,Open_Sans } from 'next/font/google'

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'iTruth News - Page Not Found',
  description: 'Oops! The page you are looking for could not be found on iTruth News. Click here to go back to the homepage.',
  keywords: '404 error, page not found, iTruth News, homepage'  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0757101243908749"
     crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
