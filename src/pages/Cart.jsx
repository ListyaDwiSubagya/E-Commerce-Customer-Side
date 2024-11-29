import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { updateCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currency = '$'; // Sesuaikan dengan currency Anda.

  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Mengumpulkan data keranjang berdasarkan state
  useEffect(() => {
    console.log('Processing Cart Data...');
    if (products.length > 0) {
      const tempData = [];
      let tempSubtotal = 0;

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const product = products.find((item) => String(item.id) === String(productId)); // Cari produk berdasarkan id
          if (product) {
            const itemTotal = product.price * cartItems[productId][size];
            tempSubtotal += itemTotal;

            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
              image: product.image,
              name: product.title,
              price: product.price,
              total: itemTotal, // Total harga per item
            });
          }
        }
      }

      // Set Subtotal dan Biaya Pengiriman
      setCartData(tempData);
      setSubtotal(tempSubtotal);

      // Tentukan biaya pengiriman berdasarkan subtotal
      if (tempSubtotal > 100) { // Misalnya, jika subtotal lebih dari 100, biaya pengiriman gratis
        setDeliveryFee(0);
      } else {
        setDeliveryFee(10); // Misalnya, biaya pengiriman adalah 10
      }

      console.log('Processed Cart Data:', tempData); // Debug hasil data
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
          {cartData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                {/* Gambar produk */}
                <img
                  className="w-16 sm:w-20"
                  src={item.image || assets.placeholder_image} // Placeholder jika tidak ada gambar
                  alt={item.name || 'Product Image'}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name || 'Product Name'}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {item.price || 'N/A'}
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
          ))}

          {/* Total keranjang dan tombol checkout */}
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <div className="w-full">
                <div className="text-2xl">
                  <Title text1={'CART'} text2={'TOTALS'} />
                </div>
                <div className="flex flex-col gap-2 mt-2 text-sm">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      {currency} {subtotal.toFixed(2)}
                    </p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>
                      {currency} {subtotal === 0 ? '0.00' : deliveryFee.toFixed(2)}
                    </p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <b>Total</b>
                    <b>
                      {currency}{' '}
                      {subtotal === 0
                        ? '0.00'
                        : (subtotal + deliveryFee).toFixed(2)}
                    </b>
                  </div>
                </div>
              </div>
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

