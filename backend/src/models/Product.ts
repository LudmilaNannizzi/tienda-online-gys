import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image?: string; 
  category: 'electronics' | 'clothing' | 'books';
  stock: number;
  createdAt: Date;
  hasStock(): boolean;
}

const productSchema = new Schema<IProduct>({
  name: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true,
    maxlength: [100, 'Máximo 100 caracteres']
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'El precio no puede ser negativo']
  },
  image: { 
    type: String 
  },
  category: { 
    type: String, 
    enum: ['electronics', 'clothing', 'books'],
    required: true 
  },
  stock: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

productSchema.methods.hasStock = function(): boolean {
  return this.stock > 0;
};



productSchema.pre<IProduct>('save', function(next) {
  if (this.stock < 0) {
    throw new Error('❌ El stock no puede ser negativo');
  }
  next();
});

productSchema.post<IProduct>('save', function(doc, next) {
  console.log(`✅ Producto ${doc.name} guardado en DB`);
  next();
});

productSchema.pre<IProduct>('deleteOne', function(next) {
  console.log(`🗑️ Eliminando producto ${this.name}`);
  next();
});

export default model<IProduct>('Product', productSchema);