import "./categorypage.scss";

import React from "react";
import ProductsList from "../ProductsList";

const CategoryPage = (props) => {
  const category = props.match.params.nom;

  const image = require(`../../images/categories/${category}.jpeg`);

  return (
    <div>
      <div
        style={{
          background: `url(${image}) no-repeat center `,
        }}
        className="category-banner"
      ></div>
      <h1 className="category-header ">{props.match.params.nom}</h1>
      <ProductsList search="" category={category}></ProductsList>
    </div>
  );
};
export default CategoryPage;
