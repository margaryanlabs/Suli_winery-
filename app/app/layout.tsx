import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SULI — Georgian Wine, Numbered by Origin",
  description: "A limited Georgian wine house from Kakheti. Edition 001 — 777 bottles."
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
