'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/api/products';
import DashboardStats from '@/components/admin/DashboardStats';
import LowStockProducts from '@/components/admin/LowStockProducts';
import SalesChart from '@/components/admin/SalesChart';
import { getProducts } from '@/lib/api/products';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(1, 1000);
        setProducts(response.products);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-gray-200">Cargando dashboard...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  const mockSalesData = [
    { month: 'Ene', sales: 1200 },
    { month: 'Feb', sales: 1900 },
    { month: 'Mar', sales: 1500 },
    { month: 'Abr', sales: 2100 },
    { month: 'May', sales: 1800 },
    { month: 'Jun', sales: 2400 },
  ];

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Administrativo</h1>
        <button
          onClick={() => router.push('/admin/products/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Crear Producto
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardStats products={products} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Productos con Bajo Stock</h2>
          <LowStockProducts products={products} />
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Ventas Mensuales</h2>
          <SalesChart data={mockSalesData} />
        </div>
      </div>
    </div>
  );
} 