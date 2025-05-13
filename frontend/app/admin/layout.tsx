'use client';

import { useAuth } from '@/lib/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-800">
        <nav className="bg-blue-900 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-100">Panel de Administración</h1>
                </div>
              </div>
             
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
} 