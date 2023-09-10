/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
	Navbar,
	Nav,
	Container,
	Row,
	NavDropdown,
	Offcanvas,

} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

function Header() {
	const navigate = useNavigate();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	console.log();

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<header
			style={{
				fontFamily: "rocko",
				background: "#3f3f798f",
				height: "3.8rem"
			}}>
			<Container className=" p-0  ">
				{["md"].map((expand) => (
					<Navbar
						fixed="top"
						variant="dark"
						collapseOnSelect
						key={expand}
						expand={expand}
						style={{
							background: "rgba(0, 0, 25, 0)",
							backdropFilter: "blur(18px)",
							marginBottom: "10px"
						}}
						className=" py-0  ">
						<Container>
							<LinkContainer to="/">
								<Navbar.Brand className="py-3 ">e-shop</Navbar.Brand>
							</LinkContainer>
							<Navbar.Toggle
								className="rounded-3 py-3  align-self-end   "
								aria-controls={`offcanvasNavbar-expand-${expand}`}
							/>

							<Navbar.Offcanvas
								style={{
									width: "60%",
									fontsize: 40,
									background: "rgba(0, 0, 25, 0.2)",
									backdropFilter: "blur(6px)",
									paddingTop: "4px",
									paddingLeft: "4px",
									color: "whiteSmoke",
									fontWeight: 900
								}}
								id={`offcanvasNavbar-expand-${expand}`}
								aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
								placement="end">
								<Offcanvas.Header
									closeButton
									className="bg-gradient rounded my-0 py-3">
									menu
								</Offcanvas.Header>

								<Nav>
									<SearchBox />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<Nav className="ml-auto fs-6 ">
										<LinkContainer to="/products">
											<Nav.Link>
												<i
													style={{ fontSize: 11 }}
													className="fa-solid fa-message-arrow-up-right">
													products&nbsp;&nbsp;&nbsp;
												</i>
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/contacts">
											<Nav.Link>
												<i
													style={{ fontSize: 11 }}
													className="fa-solid fa-message-arrow-up-right">
													contacts&nbsp;&nbsp;&nbsp;
												</i>
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/about">
											<Nav.Link>
												{" "}
												<i
													style={{ fontSize: 11 }}
													className="fa-solid fa-message-arrow-up-right">
													about&nbsp;&nbsp;
												</i>
											</Nav.Link>
										</LinkContainer>
									</Nav>
									<Nav className="m-auto px-lg-2 "></Nav>
									<Nav className="ml-auto fs-6">
										<LinkContainer to="/cart">
											<Nav.Link className="cart">
												<span
													style={{ fontSize: 11 }}
													className="fas fa-shopping-cart"></span>
												<span>{cartItems.reduce((acc, item) => acc + item.qty * 1, 0)}</span>
											</Nav.Link>
										</LinkContainer>
										{userInfo ? (
											<NavDropdown
												title={
													<i
														style={{ fontSize: 11 }}
														className="fa-solid fa-message-arrow-up-right">
														{userInfo.name}
													</i>
												}
												id="username">
												<LinkContainer to="/profile">
													<NavDropdown.Item>Profile</NavDropdown.Item>
												</LinkContainer>

												<NavDropdown.Item onClick={logoutHandler}>
													Logout
												</NavDropdown.Item>
											</NavDropdown>
										) : (
											<LinkContainer to="/login">
												<Nav.Link>
													<i className="fas fa-user">login</i>
												</Nav.Link>
											</LinkContainer>
										)}

										{userInfo && userInfo.isAdmin && (
											<NavDropdown
												title={
													<i
														style={{ fontSize: 11 }}
														className="fa-solid fa-message-arrow-up-right">
														Admin
													</i>
												}
												id="adminmenue">
												<LinkContainer to="/admin/userlist">
													<NavDropdown.Item>Users</NavDropdown.Item>
												</LinkContainer>

												<LinkContainer to="/admin/productlist">
													<NavDropdown.Item>Products</NavDropdown.Item>
												</LinkContainer>

												<LinkContainer to="/admin/orderlist">
													<NavDropdown.Item>Orders</NavDropdown.Item>
												</LinkContainer>
											</NavDropdown>
										)}
									</Nav>
								</Nav>
							</Navbar.Offcanvas>
						</Container>
					</Navbar>
				))}
			</Container>
		</header>
	);
}

export default Header;
