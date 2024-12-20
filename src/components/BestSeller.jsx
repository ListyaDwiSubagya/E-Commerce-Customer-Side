import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts()); 
    }, [dispatch]);

    // Pilih 5 produk secara acak jika data ada
    const bestSellerProducts = products.length > 0 
        ? [...products].sort(() => 0.4 - Math.random()).slice(0, 4) 
        : [];

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1="BEST" text2="SELLER" />
                <p className="w-3/4 m-auto sm:text-sm md:text-base text-gray-600">
                    Check out our best-selling products from the Fake Store API.
                </p>
            </div>

            {/* Tampilkan Loading, Error, atau Data */}
            {loading && <p>Loading best seller products...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
                    {bestSellerProducts.map((item) => (
                        <ProductItem
                            key={item.id}
                            id={item.id}
                            image={[item.image]} 
                            name={item.title}
                            price={item.price}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestSeller;
