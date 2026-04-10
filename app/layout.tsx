import type { Metadata } from "next";
import { Barlow, Geist_Mono, Stardos_Stencil, Inter, JetBrains_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtreeHeading = Figtree({subsets:['latin'],variable:'--font-heading'});

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

/** Industrial sans for body — pairs with stencil headings */
const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
              inter.variable,
              stardosStencil.variable,
              geistMono.variable
            , "font-mono", jetbrainsMono.variable, figtreeHeading.variable)}
    >
      <body className={cn("min-h-full flex flex-col antialiased animated-bg")}>
        {children}
      </body>
    </html>
  );
}
