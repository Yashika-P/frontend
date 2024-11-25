import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(10); // Example default amount
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Call the backend to create a PaymentIntent
      const { data } = await axios.post('/api/payment/create-payment-intent', {
        amount,
        currency: 'usd',
      });

      const clientSecret = data.clientSecret;

      // Confirm the payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else {
        setPaymentStatus('Payment successful!');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentStatus('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
        <label className="block mb-4">
          <span className="text-gray-700">Amount (USD)</span>
          <input
            type="number"
            className="border w-full p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Card Details</span>
          <CardElement className="border p-2 rounded" />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
          disabled={isProcessing || !stripe || !elements}
        >
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {paymentStatus && <p className="mt-4 text-center">{paymentStatus}</p>}
    </div>
  );
};

export default Checkout;
