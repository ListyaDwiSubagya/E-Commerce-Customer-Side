import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice'; 
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');
    const [search, setSearch] = useState('');

    // Fetch data from Redux store
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Apply filters and sorting on category, subcategory, and search changes
    useEffect(() => {
        const applyFilterAndSort = () => {
            let filteredProducts = products.slice();

            // Apply search filter
            if (search) {
                filteredProducts = filteredProducts.filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            // Apply category filter
            if (category.length > 0) {
                filteredProducts = filteredProducts.filter((item) => category.includes(item.category));
            }

            // Apply subcategory filter
            if (subCategory.length > 0) {
                filteredProducts = filteredProducts.filter((item) => subCategory.includes(item.subCategory || ''));
            }

            // Sort products
            switch (sortType) {
                case 'low-high':
                    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'high-low':
                    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                default:
                    break;
            }

            setFilterProducts(filteredProducts);
        };

        applyFilterAndSort();
    }, [products, category, subCategory, search, sortType]);

    // Toggle category filter
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };

    // Toggle subcategory filter
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Section */}
            <div className="min-w-60">
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className="my-2 text-xl flex items-center cursor-pointer gap-2"
                >
                    FILTERS
                    <span className={`sm:hidden ${showFilter ? 'rotate-90' : ''}`}>▼</span>
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value="men's clothing" onChange={toggleCategory} />{' '}
                            Men's Clothing
                        </p>
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value="women's clothing" onChange={toggleCategory} />{' '}
                            Women's Clothing
                        </p>
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value="jewelery" onChange={toggleCategory} /> Jewelry
                        </p>
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value="electronics" onChange={toggleCategory} /> Electronics
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Section */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1="ALL" text2="COLLECTIONS" />
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className="border-2 border-gray-300 text-sm px-2"
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {loading && <p>Loading products...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading &&
                        !error &&
                        filterProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item.id}
                                name={item.title}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
