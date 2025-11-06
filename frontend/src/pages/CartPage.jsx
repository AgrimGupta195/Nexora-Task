import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import axiosInstance from '../lib/axios';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/cart');
      setCart(response.data.cartItems || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete(`/cart/${productId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      await axiosInstance.delete(`/cart/${productId}`);
      await axiosInstance.post('/cart', { productId, qty: newQuantity });
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading cart</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl font-light text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Continue Shopping
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-light text-gray-900 mb-12 tracking-tight">Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id || item.productId} className="flex gap-6 pb-6 border-b border-gray-200 last:border-0">
                <img 
                  src={item.image || 'https://via.placeholder.com/100'} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 mb-4">${item.price?.toFixed(2) || '0.00'}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-full">
                      <button 
                        onClick={() => updateQuantity(item.id || item.productId, item.quantity - 1)} 
                        className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 min-w-[3rem] text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id || item.productId, item.quantity + 1)} 
                        className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id || item.productId)} 
                      className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Summary</h2>
              <div className="mb-6">
                <div className="flex justify-between text-lg">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkout')} 
                className="w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Checkout
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
