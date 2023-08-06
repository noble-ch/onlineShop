import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import products from "../products";

export default function Prodcuts() {
  return (
    <div id="container" className="rounded rounded-5  p-3 gradient_border ">
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
