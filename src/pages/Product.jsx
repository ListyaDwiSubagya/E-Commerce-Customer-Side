import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil data dari Redux
  const { products, loading } = useSelector((state) => state.products);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!products.length) {
      // Fetch data jika belum ada di store
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const product = products.find((item) => String(item.id) === String(productId));
    if (product) {
      setProductData(product);
      setImage(product.image);
    }
  }, [productId, products]);  

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      dispatch(addToCart({ productId: productData._id, size: 'M', quantity: 1 }));
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>Product not found!</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 w-full sm:w-[80%]'>
          <img src={image} alt={productData.title} className='w-full' />
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.title}</h1>
          <div className='flex items-center gap-1 mt-2'>
          </div>
          <p className='mt-5 text-3xl font-medium'>${productData.price}</p>
          <h1 className='text-gray-600 text-xl mt-3'>{productData.category}</h1>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <button
            onClick={handleAddToCart}
            className={`bg-black text-white px-8 py-3 text-sm mt-5`}
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

         {/* Description & Review */}
         <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
       </div>
       <div className='flex flex-col border px-6 py-6 text-sm text-gray-500'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque asperiores quasi suscipit blanditiis repellat est inventore ea voluptate, impedit iste?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla excepturi fugit deserunt?</p>
       </div>
      </div>

        {/* Related Products */}


    </div>
  );
};

export default Product;
