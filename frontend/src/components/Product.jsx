/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <Card id="card" className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={"/Iphone14.png"} />
        {/* undetected bug while fetching for the picture  */}
      </Link>
      <Card.Body>
        <Link id="product_name" to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
