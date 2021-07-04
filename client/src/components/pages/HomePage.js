import "./homepage.scss";

import React from "react";
import { Link } from "react-router-dom";
import ItemsCarousel from "../ItemsCarousel";

const HomePage = () => {
  return (
    <div className="">
      <div className="hero">
        <h1>vendure store</h1>
      </div>
      <h2 className="category">
        <Link to="/category/Electronics"> ELECTRONICS: </Link>
      </h2>

      <ItemsCarousel category="Electronics"></ItemsCarousel>
      <h2 className="category">
        <Link to="/category/Home"> HOME & GARDEN: </Link>
      </h2>
      <ItemsCarousel category="Home"></ItemsCarousel>
    </div>
  );
};
export default HomePage;
