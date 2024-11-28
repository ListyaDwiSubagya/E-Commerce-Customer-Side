import React from 'react';
import { useSelector } from 'react-redux';
import Title from './Title';

export const CartTotal = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const currency = '$'; // Sesuaikan dengan currency Anda
  const delivery_fee = 10; // Contoh fee pengiriman tetap

  // Hitung subtotal
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((subtotal, [productId, quantity]) => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        subtotal += product.price * quantity;
      }
      return subtotal;
    }, 0);
  };

  const subtotal = getCartAmount();

  return (
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
            {currency} {subtotal === 0 ? '0.00' : delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{' '}
            {subtotal === 0
              ? '0.00'
              : (subtotal + delivery_fee).toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};
