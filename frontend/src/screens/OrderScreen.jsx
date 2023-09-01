import { useEffect } from "react";
import {
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Container
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, deliverOrder } from "../actions/orderActions";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET
} from "../constants/orderConstants";

function OrderScreen() {
	const { id: orderId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, error, loading } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!loading && !error) {
		order.itemsPrice = order.orderItems
			.reduce((acc, item) => acc + item.price * item.qty, 0)
			.toFixed(2);
		console.log("amount", order.itemsPrice);
		console.log("first_name", userInfo.name);
		console.log("email", userInfo.email);
		console.log("tex_ref", orderId);
	}

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}

		if (
			!order ||
			successPay ||
			order._id !== Number(orderId) ||
			successDeliver
		) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });

			dispatch(getOrderDetails(orderId));
		}
	}, [dispatch, order, orderId, successPay, successDeliver]);

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	const sendOrder = () => {
		// Create a form element
		const form = document.createElement("form");
		form.method = "POST";
		form.action = "https://api.chapa.co/v1/hosted/pay"; // Chapa API endpoint

		// Create hidden input fields for the Chapa API parameters
		const public_key = document.createElement("input");
		public_key.type = "hidden";
		public_key.name = "public_key";
		public_key.value = "CHAPUBK_TEST-NDJfoLuHMpqJj4UM1wJUHPSXcksiZyp9"; // Replace with your Chapa public API key

		const tx_ref = document.createElement("input");
		tx_ref.type = "hidden";
		tx_ref.name = "tx_ref";
		tx_ref.value = orderId; // Use orderId as the transaction reference

		const amount = document.createElement("input");
		amount.type = "hidden";
		amount.name = "amount";
		amount.value = order.itemsPrice; // Use order.itemsPrice as the payment amount

		const currency = document.createElement("input");
		currency.type = "hidden";
		currency.name = "currency";
		currency.value = "ETB"; // Currency

		const email = document.createElement("input");
		email.type = "hidden";
		email.name = "email";
		email.value = userInfo.email; // User's email

		const first_name = document.createElement("input");
		first_name.type = "hidden";
		first_name.name = "first_name";
		first_name.value = userInfo.name; // User's name

		const callback_url = document.createElement("input");
		callback_url.type = "hidden";
		callback_url.name = "callback_url";
		callback_url.value = `http://127.0.0.1:8000/api/orders/${orderId}/pay/`;

		const return_url = document.createElement("input");
		return_url.type = "hidden";
		return_url.name = "return_url";
		return_url.value = `http://localhost:5188/order/${order._id}`;

		// Append the hidden input fields to the form
		form.appendChild(public_key);
		form.appendChild(tx_ref);
		form.appendChild(amount);
		form.appendChild(currency);
		form.appendChild(email);
		form.appendChild(first_name);
		form.appendChild(callback_url);
		form.appendChild(return_url);

		// Append the form to the document body and submit it
		document.body.appendChild(form);
		form.submit();
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Container>
			<h1>Order: {order.Id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
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

							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="warning">Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Paid on {order.paidAt}</Message>
							) : (
								<Message variant="warning">Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message variant="info">Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
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
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
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

							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}

									<Button
										variant="primary"
										className="rounded-4"
										onClick={sendOrder}>
										Pay now
									</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
						{loadingDeliver && <Loader />}
						{userInfo &&
							userInfo.isAdmin &&
							order.isPaid &&
							!order.isDelivered && (
								<ListGroup.Item>
									<Button
										type="button"
										className="btn btn-block"
										onClick={deliverHandler}>
										Mark As Delivered
									</Button>
								</ListGroup.Item>
							)}
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default OrderScreen;
