import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import axiosInstance from '../lib/axios'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/products')
      setProducts(response.data.products || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get('/cart')
      setCartItems(response.data.cartItems || [])
    } catch (err) {
      setCartItems([])
    }
  }

  const handleAddToCart = async (productId) => {
    try {
      await axiosInstance.post('/cart', { productId, qty: 1 })
      await fetchCart()
    } catch (err) {
      console.error('Error adding to cart:', err)
      alert('Failed to add product to cart')
    }
  }

  const getQuantityForProduct = (productId) => {
    const cartItem = cartItems.find(item => (item.id || item.productId) === productId)
    return cartItem ? cartItem.quantity : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading products</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-gray-900 mb-6">{error}</p>
          <button 
            onClick={fetchProducts}
            className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-3 tracking-tight">
            Shop
          </h1>
          <p className="text-xl text-gray-600 font-light">Discover our collection</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {products.map((product) => {
              const productId = product._id || product.id
              const quantity = getQuantityForProduct(productId)
              return (
                <ProductCard 
                  key={productId} 
                  product={product}
                  onAddToCart={handleAddToCart}
                  quantity={quantity}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
