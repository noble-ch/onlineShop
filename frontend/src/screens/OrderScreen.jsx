/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getOrderDetails } from "../actions/orderActions";

function OrderScreen() {
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id: orderId } = useParams();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, error, loading } = orderDetails;

	if (!loading && !error) {
		order.itemsPrice = order.orderItems
			.reduce((acc, item) => acc + item.price * item.qty, 0)
			.toFixed(2);
	}

	useEffect(() => {
		if (!order || order._id !== Number(orderId)) {
			dispatch(getOrderDetails(orderId));
		}
	}, [order, orderId]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger"></Message>
	) : (
		<Container>
			<h1>Order:{order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup className="border rounded-4" variant="flush">
						<ListGroup.Item className="border rounded-top-4">
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Shipping: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}
								{"  "}
								{order.shippingAddress.postalCode},{"  "}
								{order.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item className="border rounded-bottom-4">
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message variant="info">Your order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={3} xs={3} sm={3} xl={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>

												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>

												<Col md={4}>
													{item.qty} X ${item.price} = $
													{(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={4}>
					<ListGroup className="border rounded-top-4">
						<ListGroup variant="flush">
							<ListGroup.Item className="border rounded-top-4">
								<h2>Order Summary</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items:</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping:</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax:</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}

export default OrderScreen;
