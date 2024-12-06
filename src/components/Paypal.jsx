import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const Paypal = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        // Opsi konfigurasi tombol
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // Jumlah pembayaran
                },
              },
            ],
          });
        },
        // Ketika pembayaran berhasil
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details); // Kirim data pembayaran ke fungsi sukses
          });
        },
        // Ketika pembayaran gagal
        onError: (err) => {
          console.error('PayPal Checkout Error:', err);
         toast.error('An error occurred with PayPal Checkout')
        },
      }).render(paypalRef.current);
    }
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default Paypal;
