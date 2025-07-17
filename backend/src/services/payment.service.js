const axios = require('axios');
const Order = require('../models/order');

class PaymentService {
  async processPayment(orderId, amount, user) {
    console.log('Paystack secret key:', process.env.PAYSTACK_SECRET_KEY ? 'Set' : 'Undefined');
    console.log('Processing payment for:', { orderId, amount, user });
    const order = await Order.findOne({ _id: orderId, user: user.id });
    if (!order) {
      console.log('Order not found:', { orderId, userId: user.id });
      throw new Error('Order not found');
    }
    if (order.total !== amount) {
      console.log('Invalid amount:', { orderTotal: order.total, providedAmount: amount });
      throw new Error('Invalid amount');
    }

    try {
      const transaction = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          amount: Math.round(amount * 100) < 10000 ? 10000 : Math.round(amount * 100),
          email: user.email || 'chiamakamichael58@gmail.com',
          reference: `order_${orderId}_${Date.now()}`,
          currency: 'NGN',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Paystack response:', transaction.data);
      return {
        id: transaction.data.data.reference,
        orderId,
        amount,
        status: 'pending',
        authorizationUrl: transaction.data.data.authorization_url,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Paystack error:', error.response?.data || error.message, 'Status:', error.response?.status);
      throw new Error(`Paystack error: ${error.response?.data?.message || error.message}`);
    }
  }

  async verifyPayment(reference, user) {
    console.log('Verifying payment:', { reference, userId: user.id });
    const order = await Order.findOne({ user: user.id });
    if (!order) {
      console.log('Order not found for user:', user.id);
      throw new Error('Order not found');
    }

    try {
      const verification = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      );
      console.log('Paystack verification:', verification.data);
      const { status, amount } = verification.data.data;
      if (status === 'success') {
        await Order.findByIdAndUpdate(order._id, { status: 'completed' });
        return {
          id: reference,
          orderId: order._id,
          amount: amount / 100,
          status,
          createdAt: new Date(),
        };
      } else {
        console.log('Payment status:', status);
        return {
          id: reference,
          orderId: order._id,
          amount: amount / 100,
          status,
          createdAt: new Date(),
        };
      }
    } catch (error) {
      console.error('Paystack verification error:', error.response?.data || error.message, 'Status:', error.response?.status);
      throw new Error(`Paystack verification error: ${error.response?.data?.message || error.message}`);
    }
  }
}

module.exports = new PaymentService();