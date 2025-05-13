'use client';

import { useState, useEffect, useRef } from 'react';
import { Product, getProducts, deleteProduct } from '@/lib/api/products';
import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';
import SearchBar from '@/components/search/SearchBar';

const CATEGORIES = [
  { value: '', label: 'Todas las categorías' },
  { value: 'electronics', label: 'Electrónica' },
  { value: 'clothing', label: 'Ropa' },
  { value: 'books', label: 'Libros' },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAdmin } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [category, setCategory] = useState('');

  const fetchProducts = async (page: number, searchQuery: string = search, categoryFilter: string = category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts(page, 9, searchQuery, categoryFilter);
      setProducts(response.products);
      setTotalPages(response.totalPages);
      console.log(response.products);
      
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchInput]);

  useEffect(() => {
    fetchProducts(currentPage, search, category);
  }, [currentPage, search, category]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      await deleteProduct(id);
      await fetchProducts(currentPage, search, category);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el producto');
    }
  };

  const handleSearch = (query: string) => {
    setSearchInput(query);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={() => fetchProducts(currentPage, search, category)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No hay productos disponibles
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <SearchBar onSearch={handleSearch} value={searchInput} />
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
          className="px-4 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
            {product.imageUrl || product.image ? (
              <img
                src={product.imageUrl || product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-700 rounded">
                <span className="text-gray-400 text-lg font-medium">Sin imagen</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{product.name}</h3>
              <p className="text-gray-300 mt-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-white">${product.price}</span>
                <span className="text-sm text-gray-400">Stock: {product.stock}</span>
              </div>
              {isAdmin && (
                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    href={`/admin/products/edit/${product._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="px-4 py-2 text-gray-300">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
} 