import type { Metadata } from "next";
import { Pixelify_Sans, VT323 } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar"
import { GameProvider } from "@/context/GameContext"

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixelify-sans",
})

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
})

export const metadata: Metadata = {
  title: "SnakeX",
  description: "SnakeX browser game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelifySans.variable} ${vt323.variable} antialiased`}
      >
        <GameProvider>
          <NavBar />
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
