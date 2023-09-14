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
import {
	getOrderDetails,
	deliverOrder,
	recieveOrder,
	orderInitializePayment
} from "../actions/orderActions";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
	ORDER_RECIEVE_RESET
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

	const orderRecieve = useSelector((state) => state.orderRecieve);
	const { loading: loadingRecieve, success: successRecieve } = orderRecieve;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!loading && !error) {
		order.itemsPrice = order.orderItems
			.reduce((acc, item) => acc + item.price * item.qty, 0)
			.toFixed(2);
	}

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}

		if (
			!order ||
			successPay ||
			order._id !== Number(orderId) ||
			successDeliver ||
			successRecieve
		) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch({ type: ORDER_RECIEVE_RESET });

			dispatch(getOrderDetails(orderId));
		}
	}, [
		dispatch,
		order,
		orderId,
		successPay,
		successDeliver,
		userInfo,
		navigate,
		successRecieve
	]);

	const sendOrder = () => {
		dispatch(orderInitializePayment(order));
	};
	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};
	const recieveHandler = () => {
		dispatch(recieveOrder(order));
	};
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Container>
			<h1>Order: {orderId}</h1>
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
							<Row>
								<Col>
									{order.isDelivered ? (
										<Message variant="success">
											Shipped on {order.deliveredAt}
										</Message>
									) : (
										<Message variant="warning">Not Delivered</Message>
									)}
								</Col>
								<Col>
									{order.isRecieved ? (
										<Message variant="success">
											Recieved on {order.recievedAt}
										</Message>
									) : (
										<Message variant="warning">Not Recieved</Message>
									)}
								</Col>
							</Row>
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
												<Col md={1} sm={2} xs={2}>
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
										Mark as Delivered
									</Button>
								</ListGroup.Item>
							)}
						{loadingRecieve && <Loader />}
						{userInfo && <userInfo className="isStaff"></userInfo> &&
							order.isPaid &&
							order.isDelivered &&
							!order.isRecieved && (
								<ListGroup.Item>
									<Button
										type="button"
										className="btn btn-block"
										onClick={recieveHandler}>
										Mark as Recieved
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
