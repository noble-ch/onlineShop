/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {
	const navigate = useNavigate();

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, error, success } = orderCreate;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	cart.itemsPrice = cart.cartItems
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2);
	cart.shippingPrice = (0).toFixed(2);
	cart.taxPrice = Number(0 * cart.itemsPrice).toFixed(2);

	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	if (!cart.paymentMethod) {
		navigate("/payment");
	}

	useEffect(() => {
		if (success) {
			navigate(`/order/${order._id}`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [success, navigate]);

	const placeOrder = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice
			})
		);
	};

	return (
		<Container>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup className="border rounded-4" variant="flush">
						<ListGroup.Item className="border rounded-top-4">
							<h2>Shipping</h2>

							<p>
								<strong>Shipping: </strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city}
								{"  "}
								{cart.shippingAddress.postalCode},{"  "}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item className="border rounded-bottom-4">
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message variant="info">Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={3} xs={3} sm={3} xl={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
													{/* the image would be fixed later */}
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
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping:</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax:</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								{error && <Message variant="danger">{error}</Message>}
							</ListGroup.Item>

							<ListGroup.Item className="borders rounded-bottom-4">
								<Button
									type="button"
									className="btn-block rounded-2 py-1 px-2 tomato text-black "
									disabled={cart.cartItems === 0}
									onClick={placeOrder}>
									Place Order &nbsp;<i className="fas fa-tag"></i>
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}

export default PlaceOrderScreen;
