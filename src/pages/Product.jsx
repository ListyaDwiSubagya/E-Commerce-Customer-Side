import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { ShopContect } from '../context/ShopContect';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import { logout } from '../redux/userSlice'; // Action logout dari userSlice

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContect);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const { isLoggedIn } = useSelector((state) => state.user); // Mendapatkan status login dari Redux
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch
  const navigate = useNavigate();

  // Mendapatkan data produk
  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image ? product.image[0] : 'fallback-image-url');
    }
  };

  useEffect(() => {
    if (products.length > 0) fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Jika belum login, tampilkan alert dan arahkan ke halaman login
      navigate('/login');
    } else {
      // Jika sudah login, tambahkan produk ke keranjang
      addToCart(productData._id, size);
    }
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image && productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`product-image-${index}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {Array(5).fill().map((_, index) => (
              <img
                key={index}
                className='w-3.5'
                src={assets.star_icon}
                alt="star"
              />
            ))}
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className={`bg-black text-white px-8 py-3 text-sm ${!size ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!size}
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
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    
    </div>
  ) : <div className='opacity-0'>Loading...</div>;
};

export default Product;
