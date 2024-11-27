import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name = "No Name", price = 0 }) => {
    // If image is an array, take the first item; otherwise, fallback to a default image
    const productImage = Array.isArray(image) ? image[0] : image || "https://via.placeholder.com/150";

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="overflow-hidden rounded-md border border-gray-200 shadow-sm">
                <img
                    className="hover:scale-110 transition-transform ease-in-out duration-300 w-full h-60 object-center"
                    src={productImage}
                    alt={`Image of ${name}`} // More descriptive alt text
                />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-medium">{price ? `$${price.toFixed(2)}` : "Price not available"}</p>
        </Link>
    );
};

export default ProductItem;
