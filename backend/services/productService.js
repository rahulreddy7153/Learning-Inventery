const Product = require("../models/Product");

const productServices = {
  addProduct: async (addProduct) => {
    let product = new Product(addProduct);
    let result = addProduct.save();
    return result;
  },
  getProduct: async () => {
    try {
    } catch {}
  },
};
