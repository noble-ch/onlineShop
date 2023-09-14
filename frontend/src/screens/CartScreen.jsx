/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
	Container
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/login?redirect=shipping");
	};
	

	return (
		<Container>
			<Row>
				{" "}
				<h1>Shopping Cart</h1>
				<Col md={8}>
					{cartItems.length === 0 ? (
						<Message variant="info">
							Your cart is empty <Link to="/">Go Back</Link>
						</Message>
					) : (
						<ListGroup variant="flush">
							{cartItems.map((item) => (
								<ListGroup.Item className="list" key={item.product}>
									<Row>
										<Col md={1} sm={3} xs={3}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>

										<Col md={2}>${item.price}</Col>

										<Col md={3}>
											<Form.Control
												as="select"
												value={item.qty}
												onChange={(e) =>
													dispatch(
														addToCart(item.product, Number(e.target.value))
													)
												}>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>

										<Col md={1}>
											<Button
												type="button"
												variant="light"
												onClick={() => removeFromCartHandler(item.product)}>
												<i className="fas fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>
									Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
									) items
								</h2>
								$
								{cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)}
							</ListGroup.Item>
						</ListGroup>

						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block  rounded-2  tomato text-black t"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default CartScreen;