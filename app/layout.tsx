import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Container from "@/components/Container";
import React from "react";
import NavigationLoggedOut from "@/components/navigation/NavigationLoggedOut";

export const metadata: Metadata = {
  title:
    "PraiseConnect | Verbinde dich mit Menschen, die deine Interessen teilen!",
  description:
    "PraiseConnect - Verbinde dich mit Menschen, die deine Interessen teilen!",
  other: {
    "theme-color": "#FCE8F8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <GoogleAnalytics />
        <Container>{children}</Container>
        <NavigationLoggedOut />
      </body>
    </html>
  );
}
