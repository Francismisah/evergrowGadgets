const orderService = require('../../services/order.service');
const { validateOrder } = require('../../utils/validator');

module.exports = {
  Query: {
    orders: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await orderService.getOrders(user);
    },
    order: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await orderService.getOrderById(id, user);
    },
  },
  Mutation: {
    createOrder: async (_, { products }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      validateOrder(products);
      return await orderService.createOrder(products, user);
    },
  },
};