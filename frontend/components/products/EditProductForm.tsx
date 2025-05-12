'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, updateProduct } from '@/lib/api/products';

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'La descripción es requerida';
    }
    
    if (formData.price <= 0) {
      errors.price = 'El precio debe ser mayor a 0';
    }
    
    if (formData.stock < 0) {
      errors.stock = 'El stock no puede ser negativo';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('stock', formData.stock.toString());
      if (image) {
        formDataToSend.append('image', image);
      }

      const productData: Partial<Product> = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        image: image ? URL.createObjectURL(image) : product.image
      };

      await updateProduct(product._id, productData);
      router.push('/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Editar Producto</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500 text-white rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-2">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-gray-800 text-gray-100 border ${
              validationErrors.name ? 'border-red-500' : 'border-gray-700'
            } focus:border-blue-500 focus:outline-none`}
            required
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-300 mb-2">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-gray-800 text-gray-100 border ${
              validationErrors.description ? 'border-red-500' : 'border-gray-700'
            } focus:border-blue-500 focus:outline-none`}
            rows={3}
            required
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-300 mb-2">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-gray-800 text-gray-100 border ${
              validationErrors.price ? 'border-red-500' : 'border-gray-700'
            } focus:border-blue-500 focus:outline-none`}
            min="0"
            step="0.01"
            required
          />
          {validationErrors.price && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="block text-gray-300 mb-2">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-gray-800 text-gray-100 border ${
              validationErrors.stock ? 'border-red-500' : 'border-gray-700'
            } focus:border-blue-500 focus:outline-none`}
            min="0"
            required
          />
          {validationErrors.stock && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.stock}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-300 mb-2">Imagen (opcional)</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:outline-none"
            accept="image/*"
          />
          {product.image && (
            <div className="mt-2">
              <p className="text-gray-300 mb-2">Imagen actual:</p>
              <img src={product.image} alt="Vista previa" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </form>
  );
} 