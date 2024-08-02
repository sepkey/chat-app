import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/providers/layout-provider";
import ReduxProvider from "@/providers/redux-provider";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            <ReduxProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
