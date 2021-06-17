import React from "react";
import ProductsList from "../ProductsList";

const SearchPage = (props) => {
  // const [search, setSearch] = useState(props.match.params.search);
  // console.log(props.match.params.search, search);
  return (
    <div>
      <div
        style={{ textAlign: "center", padding: "20px 10px", color: " #2f4858" }}
      >
        <h1
          style={{ fontFamily: "Gothic,arial" }}
        >{`Results for: ${props.match.params.search}`}</h1>
      </div>

      <ProductsList search={props.match.params.search}></ProductsList>
    </div>
  );
};
export default SearchPage;
