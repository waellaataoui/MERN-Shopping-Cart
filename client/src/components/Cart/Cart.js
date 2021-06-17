import "./Cart.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  decrementItem,
  getCart,
  incrementItem,
  removeItem,
} from "../../state/actions/cart";

import CartProduct from "./CartProduct";

class Cart extends Component {
  state = {
    isOpen: false,
  };
  componentDidMount() {
    this.props.getCart();
  }

  openCart = () => {
    this.setState({ isOpen: true });
  };

  closeCart = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { cart } = this.props;
    var products = [];
    if (cart.items) {
      products = Object.keys(cart.items).map((key, i) => {
        return (
          <CartProduct
            product={cart.items[key].product}
            qty={cart.items[key].qty}
            removeItem={(id) => {
              this.props.removeItem(id);
            }}
            incrementItem={(id) => {
              this.props.incrementItem(id);
            }}
            decrementItem={(id) => {
              this.props.decrementItem(id);
            }}
            key={key}
          />
        );
      });
    }

    let classes = ["float-cart"];

    if (!!this.state.isOpen) {
      classes.push("float-cart--open");
    }

    return (
      <div className={classes.join(" ")}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => {
              console.log(cart);
              this.openCart();
            }}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cart.totalQty}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{cart.totalQty}</span>
            </span>
            <span className="header-title">Cart</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products to the cart <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">{cart.totalPrice} TND</p>
            </div>
            <div className="buy-btn">Checkout</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});
const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCart()),
  incrementItem: (id) => dispatch(incrementItem(id)),
  decrementItem: (id) => dispatch(decrementItem(id)),
  removeItem: (id) => dispatch(removeItem(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
