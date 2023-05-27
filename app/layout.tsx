import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";
import AppWrapper from "./app-wrapper";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-main-text",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-main-title",
});

export const metadata: Metadata = {
  title: "Neomovie",
  description: "A cinema web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${bebas.variable}`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
