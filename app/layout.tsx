import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "BTCD Analytics Dashboard",
  description:
    "The first third-party analytics dashboard for Elastos BTCD — Bitcoin-backed stablecoin on ESC. Live supply, peg tracking, chain health, and BTCFi yield comparisons.",
  openGraph: {
    title: "BTCD Analytics Dashboard",
    description:
      "Live analytics for Elastos BTCD — supply, peg health, ESC chain stats, and BTCFi yield comparisons. The first third-party dashboard for the BTCD ecosystem.",
    type: "website",
    siteName: "BTCD Analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "BTCD Analytics Dashboard",
    description:
      "Live analytics for Elastos BTCD — supply, peg health, ESC chain stats, and BTCFi yield comparisons.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-950 font-sans text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
