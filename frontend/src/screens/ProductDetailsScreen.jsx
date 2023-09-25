import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Form,
	Container
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
	listProductDetails,
	createProductReview
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		loading: loadingProductReview,
		error: errorProductReview,
		success: successProductReview
	} = productReviewCreate;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (successProductReview) {
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}

		dispatch(listProductDetails(id));
	}, [dispatch, id, successProductReview]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(id, {
				rating,
				comment
			})
		);
	};

	return (
		<div>
			<Container>
				<Link to="/" className="btn  my-3 ">
					Go Back
				</Link>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<>
						<Row className="border rounded p-2   ">
							<Col md={5} lg={5} sm={12} xs={12} xl={4}>
								<Image src={product.image} alt={product.name} fluid />
							</Col>

							<Col md={7} lg={7} sm xs xl={8} className="border rounded  ">
								<ListGroup variant="flush">
									<ListGroup.Item style={{ background: "none" }}>
										<h3>{product.name}</h3>
									</ListGroup.Item>

									<ListGroup.Item style={{ background: "none" }}>
										<Rating
											value={product.rating}
											text={`${product.numReviews} reviews`}
											color={"#f8e825"}
										/>
									</ListGroup.Item>

									<ListGroup.Item style={{ background: "none" }}>
										Price: ${product.price}
									</ListGroup.Item>

									<ListGroup.Item style={{ background: "none" }}>
										Description: {product.description}
									</ListGroup.Item>
								</ListGroup>
							</Col>

							<Col md={5} lg sm xs={12} xl={12} className="border rounded">
								<div>
									<ListGroup variant="flush">
										<ListGroup.Item style={{ background: "none" }}>
											<Row>
												<Col>Price:</Col>
												<Col>
													<strong>${product.price}</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item style={{ background: "none" }}>
											<Row>
												<Col>Status:</Col>
												<Col>
													{product.countInStock > 0
														? "In Stock"
														: "Out of Stock"}
												</Col>
											</Row>
										</ListGroup.Item>

										{product.countInStock > 0 && (
											<ListGroup.Item className="rounded-3 border-0">
												<Row>
													<Col className="my-0 ">Quantity</Col>
													<Col xs="auto" className="my-0 ">
														<Form
															className="rounded-2 pink text-black"
															as="select"
															value={qty}
															onChange={(e) => setQty(e.target.value)}>
															{[...Array(product.countInStock).keys()].map(
																(x) => (
																	<option key={x + 1} value={x + 1}>
																		{x + 1}
																	</option>
																)
															)}
														</Form>
													</Col>
												</Row>
											</ListGroup.Item>
										)}

										<ListGroup.Item
											className="px-0"
											style={{ background: "none" }}>
											<Button
												onClick={addToCartHandler}
												className="btn-block rounded tomato text-black py-1 px-2"
												disabled={product.countInStock == 0}
												type="button">
												Add to <i className="fas fa-cart-plus text-black"></i>
											</Button>
										</ListGroup.Item>
									</ListGroup>
								</div>
							</Col>

							{/*product review section  */}

							<Col md={7} lg={12} sm={12} xs={12} xl={12}>
								<h4>Reviews</h4>
								{product.reviews.length === 0 && (
									<Message variant="info">No Reviews Yet</Message>
								)}

								<ListGroup variant="flush">
									{product.reviews.map((review) => (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											<Rating value={review.rating} color="#f8e825" />
											<p>{review.createdAt.substring(0, 10)}</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									))}

									<ListGroup.Item>
										<h4>Write a review</h4>

										{loadingProductReview && <Loader />}
										{successProductReview && (
											<Message variant="success">Review Submitted</Message>
										)}
										{errorProductReview && (
											<Message variant="danger">{errorProductReview}</Message>
										)}

										{userInfo ? (
											<Form onSubmit={submitHandler}>
												<Form.Group controlId="rating">
													<Form.Label>Rating</Form.Label>
													<Form.Control
														as="select"
														value={rating}
														onChange={(e) => setRating(e.target.value)}>
														<option value="">Select...</option>
														<option value="1">1 - Poor</option>
														<option value="2">2 - Fair</option>
														<option value="3">3 - Good</option>
														<option value="4">4 - Very Good</option>
														<option value="5">5 - Excellent</option>
													</Form.Control>
												</Form.Group>

												<Form.Group controlId="comment">
													<Form.Label>Review</Form.Label>
													<Form.Control
														as="textarea"
														row="5"
														value={comment}
														onChange={(e) =>
															setComment(e.target.value)
														}></Form.Control>
												</Form.Group>

												<Button
													className="rounded"
													disabled={loadingProductReview}
													type="submit"
													variant="primary">
													Submit
												</Button>
											</Form>
										) : (
											<Message variant="info">
												Please <Link to="/login">login</Link> to write a review
											</Message>
										)}
									</ListGroup.Item>
								</ListGroup>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</div>
	);
}

export default ProductScreen;
