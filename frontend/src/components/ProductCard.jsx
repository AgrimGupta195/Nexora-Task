import React from "react";

export default function ProductCard({ product, onAddToCart, quantity = 0 }) {
  const productId = product._id || product.id;
  const price = product.price || 0;
  const image = product.image || "https://via.placeholder.com/300";
  const name = product.name || "Product";
  const description = product.description || "No description available";

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(productId);
    }
  };

  return (
    <div className="group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />
        {quantity > 0 && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-900 text-xs font-medium rounded-full px-3 py-1.5 shadow-sm">
            {quantity} {quantity === 1 ? 'item' : 'items'}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-medium text-gray-900 mb-1.5 line-clamp-2 leading-tight">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-xl font-light text-gray-900">${price.toFixed(2)}</span>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">
                {quantity} in cart
              </span>
              <button 
                onClick={handleAddToCart}
                className="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Add More
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="px-5 py-1.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
