import "./ProductsList.scss";

import axios from "axios";
import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from "@material-ui/lab/Skeleton";
import Product from "./Product";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [max, setMax] = useState(null);
  const [count, setCount] = useState(null);
  const [price, setPrice] = React.useState([null, null]);
  const [sliderValue, setSliderValue] = React.useState([0, 9999]);
  const [sort, setSort] = useState("pricing.retail");
  const [error, setError] = useState(null);
  const search = props.search || "";
  useEffect(() => {
    const category = props.category
      ? props.category.charAt(0).toUpperCase() + props.category.slice(1)
      : "";
    const fetchProducts = async () => {
      try {
        setError(null);
        const res = await axios.get(
          `/api/products?category=${category}&search=${search}&skip=${skip}&sort=${sort}&minPrice=${price[0] || ""
          }&maxPrice=${price[1] || ""}`
        );
        const maxPrice = res.data.maxPrice;
        if (!max) setMax(maxPrice);
        setProducts(res.data.products);
        setCount(res.data.count);
      } catch (error) {
        setError(error.response?.data);
      }
    };
    setProducts([]);
    fetchProducts();
  }, [skip, sort, price, props.category, search]);
  const handleChange = (event, value) => {
    setSkip(value * 5 - 5);
  };
  const handlePriceChange = (event, newValue) => {
    setPrice(sliderValue);
  };
  const handleSlider = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleSort = (event) => {
    setSort(event.target.value);
  };
  const marks = [
    {
      value: 0,
      label: "0 TND",
    },
    {
      value: max,
      label: `${max} TND`,
    },
  ];
  return (
    <div className="products-container">
      <div className="filters">
        <p>Price Filter:</p>
        {max && (
          <Slider
            style={{ width: "80%" }}
            value={sliderValue}
            onChangeCommitted={handlePriceChange}
            onChange={handleSlider}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            marks={marks}
            max={max}
            min={0}
          />
        )}
        <p>Sort By:</p>
        <Select value={sort} onChange={handleSort}>
          <MenuItem value={"pricing.retail"}>Price ASC</MenuItem>
          <MenuItem value={"-pricing.retail"}>Price DESC</MenuItem>
        </Select>
      </div>

      {products.length > 0 && !error && (
        <div>
          <div className="products-list">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Pagination
              style={{ display: "inline-block", padding: "20px 5px" }}
              color="secondary"
              count={count % 5 === 0 ? count / 5 : Math.floor(count / 5 + 1)}
              skip={skip}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      {products.length === 0 && !error && (
        <div className="products-list">
          {Array.from(new Array(5)).map((item, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
                flexDirection: "column",
              }}
              key={index}
            >
              <Skeleton variant="rect" width={260} height={200}></Skeleton>
              <Skeleton
                style={{ margin: "auto" }}
                width={200}
                height={20}
              ></Skeleton>
              <Skeleton
                style={{ margin: "auto" }}
                width={150}
                height={20}
              ></Skeleton>
            </div>
          ))}
        </div>
      )}
      {error && <p className="error-message"> {error} </p>}
    </div>
  );
};
export default ProductList;
