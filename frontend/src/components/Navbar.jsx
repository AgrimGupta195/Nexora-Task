import React, { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axiosInstance from '../lib/axios';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    fetchCartCount();
    const interval = setInterval(fetchCartCount, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [location.pathname]);

  const fetchCartCount = async () => {
    try {
      const response = await axiosInstance.get('/cart');
      const count = (response.data.cartItems || []).reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      setCartCount(0);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-xl font-light text-gray-900 hover:text-gray-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            E-Commerce
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
                location.pathname === '/cart'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5 leading-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-200">
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-gray-900 bg-gray-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={18} />
              <span>Shop</span>
            </Link>
            <Link
              to="/cart"
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/cart'
                  ? 'text-gray-900 bg-gray-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5 leading-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
