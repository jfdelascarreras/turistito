import type { Metadata } from "next";
import { Barlow, Geist_Mono, Stardos_Stencil } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/** Industrial sans for body — pairs with stencil headings */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/** Stencil-style military / 1940s rugged display (headings, brand) */
const stardosStencil = Stardos_Stencil({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-stencil",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Turistito",
    template: "%s | Turistito",
  },
  description: "Plataforma de turismo para planificar y disfrutar tus viajes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        barlow.variable,
        stardosStencil.variable,
        geistMono.variable,
        "font-sans"
      )}
    >
      <body className={cn("min-h-full flex flex-col antialiased animated-bg")}>
        {children}
      </body>
    </html>
  );
}
