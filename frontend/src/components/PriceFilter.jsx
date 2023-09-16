/* eslint-disable react/prop-types */
import  { useState } from "react";
import {Container} from 'react-bootstrap';

function PriceFilter({ filterProducts }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterClick = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min) && !isNaN(max)) {
      filterProducts(min, max);
    }
  };

  return (
    <Container className="bg-body-secondary ">
      <h4>Filter by Price:</h4>
      <div className="input-group mb-2  d-flex justify-content-between  ">
        <input
          type="text"
          className=" bg-transparent my-0 border-bottom border-info  border-0 w-25  "
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="text"
          className=" bg-transparent  border-bottom border-0  border-info   w-25 "
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button
          className="btn bg-transparent py-0 border-2 border-info rounded-4 "
          type="button"
          onClick={handleFilterClick}
        >
          Filter
        </button>
      </div>
    </Container>
  );
}

export default PriceFilter;
