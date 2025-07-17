const Product = require('../models/product');

class ProductService {
  async createProduct({ name, description, price, owner, mediaUrls = [] }) {
    const product = await Product.create({
      name,
      description,
      price,
      mediaUrls,
      owner,
    });
    return product;
  }

  async getProducts(user) {
    return await Product.find({ owner: user.id });
  }

  async getProductById(id, user) {
    return await Product.findOne({ _id: id, owner: user.id });
  }

  async updateProduct(id, { name, description, price, mediaUrls }, user) {
    const product = await Product.findOne({ _id: id, owner: user.id });
    if (!product) throw new Error('Product not found');

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    if (mediaUrls) product.mediaUrls = mediaUrls;

    await product.save();
    return product;
  }

  async deleteProduct(id, user) {
    const product = await Product.findOneAndDelete({ _id: id, owner: user.id });
    if (!product) throw new Error('Product not found');
  }
}

module.exports = new ProductService();