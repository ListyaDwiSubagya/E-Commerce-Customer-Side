import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const currency = '$';

  // Mengambil data dari Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products.products);

  const [subtotal, setSubtotal] = useState(0);
  const deliveryFee = 5.0; // Contoh biaya pengiriman tetap

  // Menghitung subtotal berdasarkan data keranjang
  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const tempSubtotal = Object.keys(cartItems).reduce((acc, productId) => {
        const product = products.find((item) => String(item.id) === String(productId));
        if (product) {
          const sizes = cartItems[productId];
          const productTotal = Object.keys(sizes).reduce(
            (sizeAcc, size) => sizeAcc + sizes[size] * product.price,
            0
          );
          return acc + productTotal;
        }
        return acc;
      }, 0);
      setSubtotal(tempSubtotal);
    }
  }, [cartItems, products]);

  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Bagian kiri */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input name="firstName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="First name" type="text" />
          <input name="lastName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Last name" type="text" />
        </div>
        <input name="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email address" type="email" />
        <input name="street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" type="text" />
        <div className="flex gap-3">
          <input name="city" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City" type="text" />
          <input name="state" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State" type="text" />
        </div>
        <div className="flex gap-3">
          <input name="zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Zipcode" type="number" />
          <input name="country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" type="text" />
        </div>
        <input name="phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone" type="number" />
      </div>

      {/* Bagian kanan */}
      <div className="mt-8">
        <div className="mt-8 min-w-80"></div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border px-3 p-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border px-3 p-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

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
                      {currency} {(subtotal + deliveryFee).toFixed(2)}
                    </b>
                  </div>
                </div>
              </div>
              <div className="w-full text-end ">
                <button
                  onClick={() => navigate('/')}
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
