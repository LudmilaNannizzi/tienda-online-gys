'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product, getProducts } from '@/lib/api/products';
import EditProductForm from '@/components/products/EditProductForm';

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProducts();
        const foundProduct = response.products.find(p => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-gray-200">Cargando...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!product) return <div className="text-red-400">Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <EditProductForm product={product} />
    </div>
  );
} 