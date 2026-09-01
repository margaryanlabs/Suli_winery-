import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SULI — Georgian Wine, Numbered by Origin",
  description:
    "SULI is a limited Georgian wine and chacha house shaped by qvevri, Kakheti terroir, and modern restraint.",
  keywords: ["Georgian wine", "Saperavi", "Qvevri", "Chacha", "Kakheti", "SULI"],
  openGraph: {
    title: "SULI — The Spirit of Georgia",
    description: "An ancient land. A modern expression. Numbered Georgian wine and chacha.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
