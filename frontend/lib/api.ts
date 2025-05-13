export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('http://localhost:3001/api/products');
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
