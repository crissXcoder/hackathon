import type { Metadata } from "next";
import { Providers } from "../providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard Monitoreo de Red | Coopeguanacaste",
  description: "Sistema de monitoreo de infraestructura de red en tiempo real para Coopeguanacaste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
