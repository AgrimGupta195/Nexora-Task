import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import Product from './models/productSchema.js';

dotenv.config();

const mockProducts = [
  {
    name: "Aurora Wireless Headphones",
    price: 79.99,
    description: "Comfortable over-ear headphones with active noise cancellation and 20h battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
    quantity: 12
  },
  {
    name: "Nebula Mechanical Keyboard",
    price: 129.99,
    description: "RGB hot-swappable mechanical keyboard with tactile switches and aluminium frame.",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&auto=format&fit=crop",
    quantity: 7
  },
  {
    name: "Pulse Fitness Smartwatch",
    price: 149.99,
    description: "Heart-rate, sleep tracking and GPS with 7-day battery and water resistance.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop",
    quantity: 20
  },
  {
    name: "Lumen Portable Speaker",
    price: 59.99,
    description: "Compact Bluetooth speaker with rich bass and IPX7 waterproof rating.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop",
    quantity: 25
  },
  {
    name: "Orbit 4K Action Camera",
    price: 199.99,
    description: "4K30fps action camera with electronic image stabilization and multiple mounts.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop",
    quantity: 10
  },
  {
    name: "Solace Ergonomic Chair",
    price: 249.99,
    description: "Adjustable lumbar support, breathable mesh and 120kg weight capacity.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop",
    quantity: 5
  },
  {
    name: "Flux USB-C Charger",
    price: 29.99,
    description: "65W USB-C PD charger with foldable plug and fast charging.",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop",
    quantity: 30
  },
  {
    name: "Aero Laptop Stand",
    price: 39.99,
    description: "Aluminium laptop stand with anti-slip pads and improved airflow.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop",
    quantity: 18
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert mock products
    const products = await Product.insertMany(mockProducts);
    console.log(`Successfully seeded ${products.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

