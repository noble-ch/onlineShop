/* eslint-disable react/prop-types */

import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
	return (
		<div 
			id="card"
			className="my-3 p-3 rounded d-flex flex-column align-items-center  justify-content-center bg-gradient border  ">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} />
			</Link>

			<Card.Body className="  d-flex flex-column align-items-center justify-content-center ">
				<Link id="product_name" to={`/product/${product._id}`}>
					<Card.Title as="div" style={{ color: "black", marginTop: "6px" }}>
						<strong className="text-light">{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div" style={{ color: "darkGray" }}>
					<div className="my-1">
						<Rating
							value={product.rating}
							text={`${product.numReviews} reviews`}
							color={"#f8e825"}
						/>
					</div>
				</Card.Text>
				<Card.Text className="text-black" as="h5" style={{ color: "black" }}>
					${product.price}
				</Card.Text>
			</Card.Body>
		</div>
	);
}

export default Product;
