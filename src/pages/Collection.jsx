import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice'; // Redux untuk mengambil data produk
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom'; // Import Link untuk routing

const Collection = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [filterProducts, setFilterProducts] = useState([]);

    // Panggil data dari Redux store
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Filter produk dan set produk yang akan ditampilkan
    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Section */}
            <div className="min-w-60">
                <p className="my-2 text-xl">FILTERS</p>
                {/* ... Filter content here */}
            </div>

            {/* Produk */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1="ALL" text2="COLLECTIONS" />
                </div>

                {/* Grid Produk */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {loading && <p>Loading products...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading &&
                        !error &&
                        filterProducts.map((item, index) => (
                            <Link key={index} to={`/product/${item.id}`}>
                                <ProductItem
                                    id={item.id}
                                    name={item.title}
                                    price={item.price}
                                    image={item.image}
                                />
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
