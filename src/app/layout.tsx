import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sepkey chat",
  description: "chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
