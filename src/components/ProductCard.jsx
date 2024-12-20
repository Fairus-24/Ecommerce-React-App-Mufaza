import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-700 text-sm mb-2">
        {product.description.substring(0, 60)}...
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">${product.price}</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
