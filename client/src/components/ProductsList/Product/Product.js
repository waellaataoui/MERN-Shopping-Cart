import "./Product.scss";

import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, carousel }) => {
  return (
    <div style={carousel && { border: "none" }} className="product">
      {product.pricing.pct_discount > 0 ? (
        <p
          style={
            carousel && {
              position: "relative",
              left: "auto",
              width: "40%",
              marginBottom: "0"
            }
          }
          className="discount"
        >
          -{product.pricing.pct_discount}%
        </p>
      ) : (
        <p
          style={
            carousel && {
              position: "relative",
              left: "auto",
              width: "40%"
            }
          }
          className="discount--empty"
        ></p>
      )}

      <Link to={`/product/${product._id}`}>
        <img
          style={carousel && { width: "100%" }}
          src={product.images[0]}
          alt={product.title}
        />
        <p>{product.title} </p>
        <div className="pricing">
          <p>{product.pricing.retail}TND </p>
          {product.pricing.retail !== product.pricing.list ? (
            <p style={carousel && { marginLeft: "5px" }} id="list-price">
              {product.pricing.list}TND{" "}
            </p>
          ) : null}
        </div>
      </Link>
    </div>
  );
};
export default Product;
