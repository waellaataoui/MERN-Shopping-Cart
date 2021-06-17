const Product = require("../models/Product");
module.exports = function Cart(oldCart) {
  //old cart coz u cant acces the methods unless u re-create the object oO
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;
  this.addItem = async function(id) {
    var item = this.items[id];
    if (!item) {
      // fetch and add
      try {
        const product = await Product.findById(id);
        if (!product) throw new Error("product not found");
        this.items[id] = { product, qty: 1 };
      } catch (error) {
        throw new Error("product not found");
      }
    } else {
      item.qty++;
    }
    this.totalPrice += this.items[id].product.pricing.retail;
    this.totalQty++;
  };
  //remvove item
  this.removeItem = function(id) {
    var item = this.items[id];
    if (item) {
      this.totalPrice -= item.product.pricing.retail * item.qty;
      this.totalQty -= item.qty;
      delete this.items[id];
    }
  };
  //reduce item by one
  this.reduceOne = function(id) {
    var item = this.items[id];
    if (item) {
      if (item.qty == 1) return this.removeItem(id);
      item.qty -= 1;
      this.totalPrice -= item.product.pricing.retail;
      this.totalQty -= 1;
    }
  };
  // increase item by one
  this.increaseOne = function(id) {
    var item = this.items[id];
    if (item) {
      item.qty++;
      this.totalPrice += item.product.pricing.retail;
      this.totalQty++;
    }
  };
};
