
import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios',
        required: ['name', 'description', 'price', 'category']
      });
    }

    const product = new Product({ 
      name, 
      description,
      price, 
      category, 
      stock: stock || 0 
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ 
      error: 'Error al crear el producto',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ 
      error: 'Error al obtener los productos',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};