async function assignCart(user, session) {
  if (!user.cart) {
    user.cart = session.cart;
    await user.save();
  } else {
    session.cart = user.cart;
  }
}
module.exports = assignCart;
