/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  Row,
  Col,
  Image,
  Button,
  Card,
  ListGroup,
  Form
} from "react-bootstrap";
import Product from "../components/Product";

import products from "../products";

export default function HomeScreen({ onChange, onSearch }) {
  return (
    <div>
      <div className="rounded rounded-5 p-4  gradient_border">
        <div id="home_moto">
          <Col
            md={6}
            className="display-2 font-weight-bold"
            style={{ color: "#000", fontFamily: "Arial", fontWeight: 600 }}>
            Buy Any Thing From Any Where
          </Col>
          <Col
            md={3}
            className="display-5 font-weight-bold p-3"
            style={{
              color: "black",
              fontWeight: "extrabold"
              //  border: "1px solid red"
            }}>
            <Row>
              <Col
                style={{
                  color: "black",
                  fontWeight: "extrabold",
                  borderRight: "1px solid black"
                }}>
                <h1>50+</h1>
                <h4>items</h4>
              </Col>
              <Col className="ps-4">
                <h1>100+</h1>
                <h4>Costumers</h4>
              </Col>
            </Row>
            <Col  style ={{width : "20rem"}}>
              <Form  className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-1 rounded "
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Col>
          </Col>
        </div>
      </div>

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
