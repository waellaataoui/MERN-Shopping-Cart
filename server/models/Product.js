const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  shipping: {
    type: Array,
    required: true,
  },

  pricing: {
    list: { type: Number, required: true },
    retail: { type: Number, required: true },
    pct_discount: { type: Number },
  },

  details: { type: Object },
});
ProductSchema.pre("save", async function (next) {
  const product = this;
  product.pricing.pct_discount = Math.round(
    ((product.pricing.list - product.pricing.retail) * 100) /
      product.pricing.list
  );
  next();
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
