import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { siteInfo } from "@/lib/constants";
import Header from "./header";
import Footer from "./footer";
import { env } from "@/env";
import { auth } from "@/lib/auth";

const fontName = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: siteInfo.name,
  description: siteInfo.description,
  keywords: siteInfo.keywords,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteInfo.name,
    type: "website",
    images: [siteInfo.screenshot],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${siteInfo.twitterUsername}`,
    title: siteInfo.name,
    description: siteInfo.slogan,
    images: [siteInfo.screenshot],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={fontName.className}>
        <Header session={session} />

        <main className="min-h-[60vh]">{children}</main>

        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
