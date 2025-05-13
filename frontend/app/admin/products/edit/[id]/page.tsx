'use client';

import ProductForm from '@/components/ProductForm';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Editar Producto</h1>
      <ProductForm productId={params.id} />
    </div>
  );
} 