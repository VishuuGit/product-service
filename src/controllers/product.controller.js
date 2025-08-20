const Product = require('../models/Product');
const cache = require('../cache');

exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const key = `products_${limit}_${page}`;

    const cached = cache.get(key);
    if (cached) {
      return res.json({ source: "cache", data: cached });
    }

    const products = await Product.find()
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    cache.set(key, products);
    res.json({ source: "db", data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
