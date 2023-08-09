import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchproducts() {
      const { data } = await axios.get(" http://127.0.0.1:8000//api/products/");
      setProducts(data);
    }
    fetchproducts();
  }, []);

  return (
    <div>
      <h1>Latest Prodcuts</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
