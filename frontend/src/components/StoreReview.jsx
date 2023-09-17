import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Carousel, Button, Form, Container } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createStoreReview, listStoreReviews } from "../actions/storeActions";
import { STORE_CREATE_REVIEWS_RESET } from "../constants/storeConstants";

function StoreReview() {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	const userInfo = useSelector((state) => state.userLogin.userInfo);

	const storeReviewCreate = useSelector((state) => state.storeReviewCreate);
	const {
		loading: loadingCreateReview,
		error: errorCreateReview,
		success: successCreateReview
	} = storeReviewCreate;

	const storeReviews = useSelector((state) => state.storeReviews);
	const {
		loading: loadingStoreReviews,
		error: errorStoreReviews,
		reviews
	} = storeReviews;

	useEffect(() => {
		dispatch(listStoreReviews());
		if (successCreateReview) {
			setRating(0);
			setComment("");
			dispatch({ type: STORE_CREATE_REVIEWS_RESET });
		}
	}, [dispatch, successCreateReview]);

	const submitstoreHandler = (e) => {
		e.preventDefault();
		dispatch(
			createStoreReview({
				rating,
				comment
			})
		);
	};

	return (
		<Container className="py-3" >
			<Col md lg sm xs xl>
				<h4>Store Reviews</h4>
				{loadingStoreReviews ? (
					<Loader />
				) : errorStoreReviews ? (
					<Message variant="danger">{errorStoreReviews}</Message>
				) : reviews.length === 0 ? (
					<Message variant="info">No Reviews Yet</Message>
				) : (
					<Carousel prevIcon nextIcon variant="dark" className="">
						{reviews.map((review) => (
							<Carousel.Item key={review._id}>
								<strong>{review.name}</strong>
								<Rating value={review.rating} color="#f8e825" />
								<p className="carousel-text">
									{review.createdAt.substring(0, 10)}
								</p>
								<p className="carousel-text fs-6">{review.comment}</p>
							</Carousel.Item>
						))}
					</Carousel>
				)}

				<Form onSubmit={submitstoreHandler}>
					<Form.Group controlId="rating">
						<Form.Label>Rate Our service</Form.Label>
						<Form
							className="border-1  bg-transparent border-info  text-info  rounded-2  m-2"
							as="select"
							value={rating}
							onChange={(e) => setRating(e.target.value)}>
							<option value="5">5 - Excellent</option>
							<option value="4">4 - Very Good</option>
							<option value="3">3 - Good</option>{" "}
							<option value="2">2 - Fair</option>
							<option value="1">1 - Poor</option>
							<option value="">Select...</option>
						</Form>
					</Form.Group>

					<Form.Group controlId="comment">
						<Form.Label>Comment</Form.Label>
						<Form.Control
							className="border bg-white"
							as="textarea"
							rows="2"
							value={comment}
							placeholder="Leave Us your Comment Here"
							onChange={(e) => setComment(e.target.value)}></Form.Control>
					</Form.Group>

					{userInfo ? (
						<>
							<Button
								className="rounded-4 bg-transparent  text-info border-3 border-info-subtle  my-1 py-1"
								disabled={loadingCreateReview}
								type="submit"
								variant="primary">
								Submit
							</Button>
							{loadingCreateReview && <Loader />}
							{successCreateReview && (
								<Message variant="success">Review Submitted</Message>
							)}
							{errorCreateReview && (
								<Message variant="danger">{errorCreateReview}</Message>
							)}
						</>
					) : (
						<Message variant="info">
							Please <Link to="/login">login</Link> to write a review
						</Message>
					)}
				</Form>
			</Col>
		</Container>
	);
}

export default StoreReview;
