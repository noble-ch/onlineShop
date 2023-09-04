import { useEffect ,useCallback} from "react";
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
import.meta.env.VITE_REACT_APP_CHAPA_PUBLIC_KEY;

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
    const sendOrder = useCallback(async () => {
		try {
			// Create a form element
			
			const checkPaymentResponse = await fetch(
				`http://127.0.0.1:9000/api/orders/${orderId}/pay/`
			);
			const checkPaymentData = await checkPaymentResponse.json();

			// You can handle the response data as needed, for example:
			if (checkPaymentData.isPaid) {
				// The order is paid, you can perform actions here
				console.log("Order is paid");
			} else {
				// The order is not paid, handle accordingly
				console.log("Order is not paid");
			}
		} catch (error) {
			// Handle any errors that may occur during the process
			console.error("Error checking payment status:", error);
		}
	});
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
    
        // Call the sendOrder function when the component mounts
        sendOrder();
    }, [dispatch, order, orderId, successPay, successDeliver, userInfo, navigate, sendOrder]);

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
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
