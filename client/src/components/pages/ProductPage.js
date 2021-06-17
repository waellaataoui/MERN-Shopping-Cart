import "./productPage.scss";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-items-carousel";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../state/actions/cart";

const ProductPage = (props) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [children, setChildren] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const createChildren = (images) =>
    images.map((image, i) => (
      <img
        style={{ height: "200px" }}
        key={"img" + i}
        src={image}
        alt="product img"
      />
    ));

  const changeActiveItem = (activeItemIndex) => {
    setActiveItemIndex(activeItemIndex);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${props.match.params.id}`);
        setProduct(res.data);
        setChildren(createChildren(res.data.images));
      } catch (error) {
        setError(error.response.data);
      }
    };
    fetchProduct();
  }, [props.match.params.id]);
  return (
    <>
      {error && <p className="error-message"> Product Not Found</p>}
      {product && (
        <div className="stepper">
          {product.type.map((category, i) => {
            if (i === product.type.length - 1)
              return (
                <Link key={i} to={`/category/${category}`}>
                  {category}{" "}
                </Link>
              );
            else
              return (
                <Link key={i} to={`/category/${category}`}>
                  {" "}
                  {`${category} > `}{" "}
                </Link>
              );
          })}
        </div>
      )}
      <div>
        <div className="presentation">
          <div className="carousel-container">
            <Carousel
              infiniteLoop={false}
              gutter={12}
              activePosition={"center"}
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevrons={false}
              numberOfCards={1}
              slidesToScroll={1}
              outsideChevron={true}
              showSlither={false}
              firstAndLastGutter={false}
              activeItemIndex={activeItemIndex}
              requestToChangeActive={changeActiveItem}
              chevronHeight={10}
              rightChevron={
                <div className="arrowButton">
                  <i aria-label="icon: right">
                    <svg
                      viewBox="64 64 896 896"
                      data-icon="right"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                    </svg>
                  </i>
                </div>
              }
              leftChevron={
                <div className="arrowButton">
                  <i aria-label="icon: left">
                    <svg
                      viewBox="64 64 896 896"
                      data-icon="left"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                    </svg>
                  </i>
                </div>
              }
            >
              {children}
            </Carousel>
          </div>
          {product && (
            <div id="highlights">
              <p style={{ fontSize: "20px", padding: "10px" }}>
                {product.title}{" "}
              </p>
              <div className="price">
                <p>{product.pricing.retail}TND </p>
                {product.pricing.retail !== product.pricing.list ? (
                  <>
                    <p id="list-price">{product.pricing.list}TND </p>
                    <p id="discount">-{product.pricing.pct_discount}% </p>
                  </>
                ) : null}
              </div>
              <button
                onClick={() => props.addItem(product._id)}
                className="add-button"
              >
                {" "}
                Add To Cart
              </button>
            </div>
          )}
        </div>

        {product && (
          <div className="product-details">
            <div className="shipping">
              <p className="section-header">Shipping:</p>
              {product.shipping.map((method, i) => (
                <div key={"method" + i}>
                  <p>{`- ${method.type}`}</p>
                  <p>{`Price: ${method.price} TND`}</p>
                </div>
              ))}
            </div>
            <div className="description">
              <p className="section-header">Description:</p>
              <p>{product.description} </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addItem: (id) => dispatch(addItem(id)),
});
export default connect(null, mapDispatchToProps)(ProductPage);
