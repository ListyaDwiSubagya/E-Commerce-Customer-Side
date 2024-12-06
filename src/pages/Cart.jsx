import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { updateCart, clearCart } from '../redux/cartSlice';
import { reduceStock } from '../redux/productSlice'; // Import action untuk mengurangi stok
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currency = '$'; // Currency aplikasi Anda.

  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const [stockWarnings, setStockWarnings] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      let tempSubtotal = 0;

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const product = products.find((item) => String(item.id) === String(productId));
          if (product) {
            const itemTotal = product.price * cartItems[productId][size];
            tempSubtotal += itemTotal;

            tempData.push({
              _id: productId,
              quantity: cartItems[productId][size],
              size,
              image: product.image,
              name: product.title,
              price: product.price,
              stock: product.quantity,
              total: itemTotal,
            });
          }
        }
      }

      setCartData(tempData);
      setSubtotal(tempSubtotal);

      
    }
  }, [cartItems, products]);

  const handleQuantityChange = (productId, size, quantity) => {
    if (!quantity || quantity < 1) return;

    const product = cartData.find((item) => item._id === productId && item.size === size);

    if (product && quantity > product.stock) {
      // Jika stok tidak mencukupi
      setStockWarnings((prev) => ({
        ...prev,
        [`${productId}-${size}`]: `Only ${product.stock} in stock!`,
      }));
    } else {
      // Hapus peringatan jika jumlah valid
      setStockWarnings((prev) => {
        const { [`${productId}-${size}`]: _, ...rest } = prev;
        return rest;
      });

      dispatch(updateCart({ productId, size, quantity: Number(quantity) }));
    }
  };

  const handleRemoveItem = (productId, size) => {
    dispatch(updateCart({ productId, size, quantity: 0 }));
  };

  const handleCheckout = () => {
    // Validasi stok sebelum checkout
    const outOfStockItems = cartData.filter((item) => item.quantity > item.stock);

    if (outOfStockItems.length > 0) {
      // Tampilkan peringatan jika stok tidak mencukupi
      const warnings = {};
      outOfStockItems.forEach((item) => {
        warnings[`${item._id}-${item.size}`] = `Only ${item.stock} in stock!`;
      });
      setStockWarnings(warnings);

      alert('Some items have insufficient stock. Please adjust your cart.');
      return;
    }

    // Update stok di Redux
    const itemsToReduce = cartData.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));
    dispatch(reduceStock({ items: itemsToReduce }));

    // Bersihkan keranjang
    dispatch(clearCart());

    // Navigasi ke halaman place-order
    navigate('/place-order', {
      state: {
        subtotal,
      },
    });
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

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
          {cartData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={item.image || assets.placeholder_image}
                  alt={item.name || 'Product Image'}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name || 'Product Name'}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {item.price || 'N/A'}
                    </p>
                    {stockWarnings[`${item._id}-${item.size}`] && (
                      <p className="text-red-500 text-xs sm:text-sm font-medium">
                        {stockWarnings[`${item._id}-${item.size}`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) =>
                    handleQuantityChange(item._id, item.size, e.target.value)
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  value={item.quantity}
                />
              </div>
              <img
                onClick={() => handleRemoveItem(item._id, item.size)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Delete"
              />
            </div>
          ))}

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <div className="text-2xl">
                <Title text1={'CART'} text2={'TOTALS'} />
              </div>
              <div className="flex flex-col gap-2 mt-2 text-sm">
                <hr />
                <div className="flex justify-between">
                  <b>Total</b>
                  <b>{currency} {(subtotal).toFixed(2)}</b>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
