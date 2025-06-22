import axios from 'axios';
import { PAYSTACK_SECRET_KEY, PAYSTACK_CALLBACK_URL } from '@env';

type PaymentData = {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

type VerificationData = {
  status: boolean;
  message: string;
  data: any;
};

if (!PAYSTACK_SECRET_KEY) {
  throw new Error('Missing Paystack secret key in environment variables');
}

export const initializePayment = async (
  email: string, 
  amount: number, 
  metadata = {}
): Promise<PaymentData> => {
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100,
        metadata,
        callback_url: PAYSTACK_CALLBACK_URL || 'https://your-default-callback.com'
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data?.status) {
      throw new Error(response.data?.message || 'Payment initialization failed');
    }

    return response.data;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Payment initialization failed'
    );
  }
};

export const verifyPayment = async (reference: string): Promise<VerificationData> => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );

    if (!response.data?.status) {
      throw new Error(response.data?.message || 'Payment verification failed');
    }

    return response.data;
  } catch (error) {
    console.error('Paystack verification error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Payment verification failed'
    );
  }
};

export const listTransactions = async () => {
  try {
    const response = await axios.get(
      'https://api.paystack.co/transaction',
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Paystack list transactions error:', error);
    throw error;
  }
};