const Product = require('../../models/product');
const productService = require('../../services/product.service');
const { validateProduct } = require('../../utils/validator');

module.exports = {
  Query: {
    products: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await productService.getProducts(user);
    },
    product: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await productService.getProductById(id, user);
    },
  },
  Mutation: {
    createProduct: async (_, { name, description, price, mediaUrls }, { user }) => {
      console.log('createProduct user:', user); // Debug
      if (!user || user.role !== 'seller') {
        throw new Error('Not authorized');
      }
      validateProduct({ name, price });
      const product = await Product.create({
        name,
        description,
        price,
        mediaUrls,
        owner: user.id,
      });
      return product;
    },
    updateProduct: async (_, { id, name, description, price, media }, { user }) => {
      if (!user || user.role !== 'owner') throw new Error('Not authorized');
      return await productService.updateProduct(id, { name, description, price, media }, user);
    },
    deleteProduct: async (_, { id }, { user }) => {
      if (!user || user.role !== 'owner') throw new Error('Not authorized');
      await productService.deleteProduct(id, user);
      return id;
    },
  },
};