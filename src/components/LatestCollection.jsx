import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts()); // Panggil thunk untuk fetch data
    }, [dispatch]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1="LATEST" text2="COLLECTIONS" />
                <p className="w-3/4 m-auto sm:text-sm md:text-base text-gray-600">
                    Explore our latest collection from the Fake Store API.
                </p>
            </div>

            {/* Tampilkan Loading, Error, atau Data */}
            {loading && <p>Loading products...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
                    {products.map((item) => (
                        <ProductItem
                            key={item.id}
                            id={item.id}
                            image={[item.image]} // Mengirimkan array image
                            name={item.title}
                            price={item.price}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestCollection;
