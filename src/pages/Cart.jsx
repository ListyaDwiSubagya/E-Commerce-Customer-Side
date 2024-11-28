import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { CartTotal } from '../components/CartTotal';
import { updateCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currency = '$'; // Sesuaikan dengan currency Anda.

  const [cartData, setCartData] = useState([]);

  // Mengumpulkan data keranjang berdasarkan state
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Mengupdate jumlah item
  const handleQuantityChange = (productId, size, quantity) => {
    if (!quantity || quantity < 1) return;
    dispatch(updateCart({ productId, size, quantity: Number(quantity) }));
  };

  // Menghapus item dari keranjang
  const handleRemoveItem = (productId, size) => {
    dispatch(updateCart({ productId, size, quantity: 0 }));
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Jika keranjang kosong */}
      {cartData.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Your cart is empty!</p>
          <button
            onClick={() => navigate('/')}
            className="mt-5 bg-black text-white text-sm px-8 py-3"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {/* Daftar produk di keranjang */}
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            // Validasi data produk
            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  {/* Gambar produk */}
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image || assets.placeholder_image} // Placeholder jika tidak ada gambar
                    alt={productData.name || 'Product Image'}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name || 'Product Name'}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price || 'N/A'}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>
                {/* Input jumlah */}
                <input
                  onChange={(e) =>
                    handleQuantityChange(item._id, item.size, e.target.value)
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                {/* Tombol hapus */}
                <img
                  onClick={() => handleRemoveItem(item._id, item.size)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Delete"
                />
              </div>
            );
          })}

          {/* Total keranjang dan tombol checkout */}
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end ">
                <button
                  onClick={() => navigate('/place-order')}
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
