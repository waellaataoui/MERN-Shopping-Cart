import "./ItemsCarousel.scss";

import axios from "axios";
import React from "react";
import Carousel from "react-items-carousel";
import Product from "../ProductsList/Product";

export default class ItemsCarousel extends React.Component {
  state = {
    children: [],
    activeItemIndex: 0,
  };
  async componentWillMount() {
    const res = await axios.get(`/api/products?category=${this.props.category}`);

    await this.setState({
      children: this.createChildren(res.data.products),
      activeItemIndex: 0,
    });
  }

  createChildren = (products) =>
    products.map((product) => (
      <Product key={product._id} carousel={true} product={product}></Product>
    ));

  changeActiveItem = (activeItemIndex) => {
    this.setState({ activeItemIndex });
  };

  render() {
    const { activeItemIndex, children } = this.state;
    return (
      <div className="container">
        <Carousel
          infiniteLoop={true}
          gutter={12}
          activePosition={"center"}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={true}
          numberOfCards={window.screen.availWidth >= 900 ? 5 : 2}
          slidesToScroll={1}
          outsideChevron={true}
          showSlither={false}
          firstAndLastGutter={false}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={this.changeActiveItem}
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
    );
  }
}
