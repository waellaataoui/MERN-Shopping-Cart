import React, { Component } from "react";
import Thumb from "../Thumb";
class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
    };
  }

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  handleOnDecrease = () => {
    const { decrementItem } = this.props;
    const { product } = this.props;

    decrementItem(product._id);
  };

  handleOnIncrease = () => {
    const { incrementItem } = this.props;

    const { product } = this.props;

    incrementItem(product._id);
  };

  render() {
    const { removeItem } = this.props;
    const { product, qty } = this.props;

    const classes = ["shelf-item"];

    if (!!this.state.isMouseOver) {
      classes.push("shelf-item--mouseover");
    }

    return (
      <div className={classes.join(" ")}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeItem(product._id)}
        />
        {
          <Thumb
            classes="shelf-item__thumb"
            src={product.images[0]}
            alt={product.title}
          />
        }
        <div className="shelf-item__details">
          <p className="title">{product.title}</p>
          <p className="desc">
            {product.description} <br />
            Quantity: {qty}
          </p>
        </div>
        <div className="shelf-item__price">
          <p>{product.pricing.retail} TND</p>
          <div>
            <button
              onClick={this.handleOnDecrease}
              className="change-product-button"
            >
              -
            </button>
            <button
              onClick={this.handleOnIncrease}
              className="change-product-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
