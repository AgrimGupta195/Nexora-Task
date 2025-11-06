import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import axiosInstance from '../lib/axios';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/cart');
      const cartItems = response.data.cartItems || [];
      const cartTotal = response.data.total || 0;
      
      if (cartItems.length === 0) {
        navigate('/cart');
        return;
      }
      
      setCart(cartItems);
      setTotal(cartTotal);
    } catch (error) {
      console.error('Error fetching cart:', error);
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axiosInstance.post('/checkout', {
        name: formData.name,
        email: formData.email,
      });

      setReceipt(response.data.receipt);
      setShowReceipt(true);
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading checkout</p>
        </div>
      </div>
    );
  }

  if (showReceipt && receipt) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">Order Complete</h2>
          <p className="text-gray-600 mb-2 text-sm">Order ID</p>
          <p className="text-gray-900 font-mono text-sm mb-8">{receipt.orderId}</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
            <h3 className="font-medium text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-2 mb-4">
              {receipt.cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} × {item.quantity}</span>
                  <span className="text-gray-900 font-medium">${((item.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-medium text-gray-900">${receipt.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left text-sm">
            <p className="mb-2"><span className="text-gray-600">Customer:</span> <span className="text-gray-900">{receipt.customer?.name}</span></p>
            <p><span className="text-gray-600">Email:</span> <span className="text-gray-900">{receipt.customer?.email}</span></p>
          </div>
          
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-light text-gray-900 mb-12 tracking-tight">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 transition-all"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 transition-all"
              placeholder="john@example.com"
            />
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id || item.productId} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} × {item.quantity}</span>
                  <span className="text-gray-900 font-medium">${((item.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between text-lg">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
