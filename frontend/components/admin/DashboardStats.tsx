import { Product } from '@/lib/api/products';

interface DashboardStatsProps {
  products: Product[];
}

export default function DashboardStats({ products }: DashboardStatsProps) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockProducts = products.filter(product => product.stock < 10).length;

  return (
    <>
      <div className="bg-blue-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Total de Productos</h3>
        <p className="text-3xl font-bold">{totalProducts}</p>
      </div>

      <div className="bg-green-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Valor Total del Inventario</h3>
        <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
      </div>

      <div className="bg-red-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Productos con Bajo Stock</h3>
        <p className="text-3xl font-bold">{lowStockProducts}</p>
      </div>
    </>
  );
} 