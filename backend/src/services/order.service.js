const Order = require('../models/order');
const Product = require('../models/product');

class OrderService {
  async createOrder(products, user) {
    let total = 0;
    const orderItems = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        total += product.price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    return await Order.create({ user: user.id, products: orderItems, total });
  }

  async getOrders(user) {
    return await Order.find({ user: user.id });
  }

  async getOrderById(id, user) {
    const order = await Order.findOne({ _id: id, user: user.id });
    if (!order) throw new Error('Order not found');
    return order;
  }
}

module.exports = new OrderService();