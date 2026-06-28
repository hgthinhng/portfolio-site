import type { Metadata } from "next";
import { GeistSans, GeistMono, sourceSerif } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hung Thinh Nguyen",
  description: "Investment analyst · Systems builder · AI-solutions consultant · Finance educator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${sourceSerif.variable}`}
    >
      <body className="font-sans bg-bg text-fg">{children}</body>
    </html>
  );
}
