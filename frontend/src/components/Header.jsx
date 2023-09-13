/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
	Navbar,
	Nav,
	Container,
	NavDropdown,
	Offcanvas
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import GoogleTranslateComponent from "../components/GoogleTranslateComponent";

function Header() {
	const navigate = useNavigate();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const getCategory = (event) => {
		const category = event.target.textContent;
		navigate(`/categories/${category}`);
		console.log(category);
	};

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<header
			style={{
				fontFamily: "rocko",
				// background: "#3f3f798f",
				height: "3.8rem"
			}}>
			<Container className=" p-0  ">
				{["md"].map((expand) => (
					<Navbar
						fixed="top"
						variant="light"
						collapseOnSelect
						key={expand}
						expand={expand}
						style={{
							// background: "rgba(0, 0, 0, 1)",
							backdropFilter: "blur(5px)",
							marginBottom: "10px"
						}}
						className=" py-0 bg-white ">
						<Container>
							<LinkContainer to="/">
								<Navbar.Brand className="py-3  px-0 mx-0">
									OticShop
								</Navbar.Brand>
							</LinkContainer>

							<LinkContainer to="/">
								<Nav.Link>
									<span
										style={{ fontSize: 16 }}
										className="fas fa-home d-md-none text-black "></span>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/products">
								<Nav.Link>
									<img
										className="d-md-none"
										src="/Product_Page.png"
										alt="products"
										style={{
											width: "20px",
											height: "16px",
											// filter: "invert(100%)",
											marginBottom: "4.5px"
										}}
									/>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/contacts">
								<Nav.Link>
									<span
										style={{ fontSize: 16 }}
										className="fa-solid fa-circle-question d-md-none text-black "></span>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link className="cart">
									<span
										style={{ fontSize: 16 }}
										className="fas fa-shopping-cart  d-md-none text-black"></span>
									<span className=" d-md-none">
										{cartItems.reduce((acc, item) => acc + item.qty * 1, 0)}
									</span>
								</Nav.Link>
							</LinkContainer>

							<Navbar.Toggle
								className="rounded-3 my-3 py-0 mx-0 px-0 align-self-end  "
								aria-controls={`offcanvasNavbar-expand-${expand}`}
							/>

							<Navbar.Offcanvas
								className="tomato  "
								style={{
									width: "60%",
									fontsize: 40,
									background: "rgba(200, 140, 0, 1 )",
									backdropFilter: "blur(6px)",
									paddingTop: "4px",
									paddingLeft: "4px",
									color: "black",
									fontWeight: 900
								}}
								id={`offcanvasNavbar-expand-${expand}`}
								aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
								placement="end">
								<Offcanvas.Header closeButton className=" my-0 py-3">
									menu
								</Offcanvas.Header>

								<Nav>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<SearchBox />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<Nav className="ml-auto fs-6 ">
										<LinkContainer to="/">
											<Nav.Link className="d-flex justify-content-start ">
												<span
													style={{ fontSize: 16 }}
													className="fas fa-home  "></span>
												<span>&nbsp;Home</span>
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/products">
											<Nav.Link className="d-flex justify-content-start ">
												<img
													id="products-icon"
													src="/Product_Page.png"
													alt="products"
												/>

												<span>&nbsp;products</span>
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/contacts">
											<Nav.Link className="d-flex justify-content-start ">
												<span
													style={{ fontSize: 16 }}
													className="fa-solid fa-circle-question  "></span>
												<span className="  ">
													{" "}
													&nbsp;About&nbsp;&nbsp;&nbsp;
												</span>
											</Nav.Link>
										</LinkContainer>
									</Nav>
									<Nav className="m-auto px-lg-2 "></Nav>
									<Nav className="ml-auto fs-6">
										<LinkContainer to="/cart">
											<Nav.Link className="cart ">
												<span
													style={{ fontSize: 16 }}
													className="fas fa-shopping-cart "></span>

												<span className=" ">
													{cartItems.reduce(
														(acc, item) => acc + item.qty * 1,
														0
													)}
												</span>
												<span>&nbsp;Cart</span>
											</Nav.Link>
										</LinkContainer>
										{userInfo ? (
											<NavDropdown
												title={
													<span style={{ fontSize: 12 }} className="">
														{userInfo.name}
													</span>
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
												<Nav.Link className="d-flex justify-content-start ">
													<span
														style={{ fontSize: 15 }}
														className="fas fa-user"></span>
													<span>&nbsp;&nbsp;login</span>
												</Nav.Link>
											</LinkContainer>
										)}

										{userInfo && userInfo.isAdmin && (
											<NavDropdown
												title={
													<span style={{ fontSize: 11 }} className="">
														Admin
													</span>
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
									<GoogleTranslateComponent />
								</Nav>
							</Navbar.Offcanvas>
						</Container>
					</Navbar>
				))}
				<Navbar
					className="text-center py-0 text-black d-flex justify-content-center  "
					style={{ marginTop: "3.8rem" }}>
					<Nav fluid className="d- justify-content-around w-100 ">
						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Laptops</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Phones</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>watchs</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Tvs</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Furnitures</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Gamming</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>sports</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Cameras</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>music</span>
						</Nav.Link>

						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Pc Parts</span>
						</Nav.Link>
						<Nav.Link className="text-capitalize " onClick={getCategory}>
							<span>Gadgets</span>
						</Nav.Link>
					</Nav>
				</Navbar>
			</Container>
		</header>
	);
}

export default Header;
