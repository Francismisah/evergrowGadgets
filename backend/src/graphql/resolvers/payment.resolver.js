const paymentService = require('../../services/payment.service');

module.exports = {
  Mutation: {
    processPayment: async (_, { input }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await paymentService.processPayment(input.orderId, input.amount, user);
    },
    verifyPayment: async (_, { reference }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await paymentService.verifyPayment(reference, user);
    },
  },
};