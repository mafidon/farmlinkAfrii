import { useState } from 'react';
import { initializePayment, verifyPayment } from '../services/paystack';

type PaystackError = {
  message: string;
  code?: string;
};

export default function usePaystack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PaystackError | null>(null);

  const makePayment = async (email: string, amount: number, metadata = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const paymentData = await initializePayment(email, amount, metadata);
      return paymentData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkPayment = async (reference: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const verification = await verifyPayment(reference);
      return verification;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { makePayment, checkPayment, loading, error };
}