import { Link, useParams } from "react-router-dom"; // Import the useParams hook
import products from "../products";
import { Row, Col, Image, Button, Card, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";

export default function ProductScreen() {
  const { id } = useParams(); // Use the useParams hook to get the 'id' parameter
  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div>
        <Link to="/" className="btn btn-light my-3">
          GO Back
        </Link>
        Product not found
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        GO Back
      </Link>
      <Row>
        <Col>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              <div style={{ fontWeight: "bold" }}>Description: </div>
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stok" : "out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={product.countInStock === 0}
                  type="button">
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
