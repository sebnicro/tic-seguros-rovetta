import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema Web de Seguros - AP",
  description: "Trabajo Integrador Cuatrimestral - Seguros de Accidentes Personales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
        {/* Navbar */}
        <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-600 text-white font-bold p-2 rounded-lg text-lg">🛡️</span>
                <div>
                  <span className="font-bold text-xl tracking-tight">Seguros AP</span>
                  <span className="hidden sm:inline-block ml-2 text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">ISFT 199</span>
                </div>
              </div>
              <nav className="flex space-x-1 sm:space-x-4">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/clientes"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-400 transition"
                >
                  Clientes
                </Link>
                <Link
                  href="/polizas"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-400 transition"
                >
                  Pólizas
                </Link>
                <Link
                  href="/siniestros"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-400 transition"
                >
                  Siniestros
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
          Trabajo Integrador Cuatrimestral - Análisis de Datos y Explotación • Sebastian Nicolas Rovetta
        </footer>
      </body>
    </html>
  );
}
