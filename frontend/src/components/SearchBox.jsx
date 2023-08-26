import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/products/?keyword=${keyword}&page=1`);
    } else {
      navigate(navigate(location.pathname));
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex  " >
      <Form.Control 
        id="search-field"
        type="search"
        name=" "
        placeholder="Search Products . . . "
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-2 w-100 w-sm-auto"
      />

      <Button id="search-button" type="submit">
        <i className="fas fa-search" style={{ textAlign: "center" }}></i>
      </Button>
    </Form>
  );
}

export default SearchBox;
