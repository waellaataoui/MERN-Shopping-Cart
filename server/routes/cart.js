const router = require("express").Router();
const Cart = require("../models/Cart");
router.get("/", (req, res) => {
  var cart = req.session.cart;
  if (!cart) {
    cart = new Cart({});
    req.session.cart = cart;
  }
  res.send(cart);
});
router.get("/add-item/:id", async (req, res) => {
  const oldCart = req.session.cart || {};
  var cart = new Cart(oldCart);
  try {
    await cart.addItem(req.params.id);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }

  req.session.cart = cart;
  if (req.user) {
    req.user.cart = cart;
    await req.user.save();
  }
  return res.send(cart);
});

router.get("/remove-item/:id", async (req, res) => {
  const oldCart = req.session.cart || {};
  var cart = new Cart(oldCart);

  cart.removeItem(req.params.id);
  req.session.cart = cart;
  return res.send(cart);
});
router.get("/reduce-item/:id", async (req, res) => {
  const oldCart = req.session.cart || {};
  var cart = new Cart(oldCart);
  cart.reduceOne(req.params.id);
  req.session.cart = cart;
  if (req.user) {
    req.user.cart = cart;
    await req.user.save();
  }
  return res.send(cart);
});
router.get("/increase-item/:id", async (req, res) => {
  const oldCart = req.session.cart || {};
  var cart = new Cart(oldCart);
  cart.increaseOne(req.params.id);
  req.session.cart = cart;
  if (req.user) {
    req.user.cart = cart;
    await req.user.save();
  }
  return res.send(cart);
});
module.exports = router;
