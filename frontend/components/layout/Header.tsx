'use client';

import Link from 'next/link';
import Button from '../common/Button';
import { useAuth } from '@/lib/context/AuthContext';

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Gestión y Servicios SRL
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Productos
            </Link>
            <Link href="/categorias" className="text-gray-300 hover:text-white transition-colors">
              Categorías
            </Link>
            <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
              Contacto
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            
            {isAuthenticated  ? (
                <>
                {isAdmin && (
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white">
                    Dashboard
                  </Button>
                </Link>
                )}
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-500 text-white"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 