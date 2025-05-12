import { Product } from '@/lib/api/products';
import Image from 'next/image';

interface LowStockProductsProps {
  products: Product[];
}

export default function LowStockProducts({ products }: LowStockProductsProps) {
  const lowStockProducts = products
    .filter(product => product.stock < 10)
    .sort((a, b) => a.stock - b.stock);

  if (lowStockProducts.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">
        No hay productos con bajo stock
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="pb-3">Producto</th>
            <th className="pb-3">Stock</th>
            <th className="pb-3">Precio</th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map((product) => (
            <tr key={product._id} className="border-b border-gray-700">
              <td className="py-3">
                <div className="flex items-center space-x-3">
                  {product.imageUrl ? (
                    <div className="relative w-10 h-10">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Sin imagen</span>
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                  </div>
                </div>
              </td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded text-sm ${
                  product.stock === 0 
                    ? 'bg-red-500 text-white' 
                    : product.stock < 5 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-orange-500 text-white'
                }`}>
                  {product.stock} unidades
                </span>
              </td>
              <td className="py-3 text-white">${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 