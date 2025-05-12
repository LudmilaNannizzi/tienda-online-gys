import type { Metadata } from "next";
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';

export const metadata: Metadata = {
  title: "Técnico: Gestión y Servicios SRL",
  description: "Prueba técnica: Gestión y Servicios SRL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-800 text-gray-900">
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
