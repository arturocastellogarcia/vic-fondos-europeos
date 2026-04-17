import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Fondos Europeos · Agenda Digital e Innovación · Ajuntament de València",
  description: "Dashboard de seguimiento de proyectos europeos del Área de Agenda Digital e Innovación del Ajuntament de València",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <div className="site-header-top">
            <div>
              <h1>Fondos Europeos Captados · Área de Agenda Digital e Innovación</h1>
              <div className="subtitle">Ajuntament de València · Seguimiento de proyectos financiados con fondos europeos</div>
            </div>
            <div className="meta">
              <strong>Actualizado abril 2026</strong>
              Dashboard de seguimiento
            </div>
          </div>
          <Nav />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
