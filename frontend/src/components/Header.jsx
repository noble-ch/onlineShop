/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
	Navbar,
	Nav,
	Container,
	Row,
	NavDropdown,
	Offcanvas
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

function Header() {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header
			style={{
				fontFamily: "rocko",
				background: "#ceceda",
				height: "4rem"
			}}>
			<Container fluid className=" p-0 ">
				{["lg"].map((expand) => (
					<Navbar
						fixed="top"
						bg="primary"
						variant="dark"
						collapseOnSelect
						key={expand}
						expand={expand}
						className="brand py-0">
						<Container fluid>
							<LinkContainer to="/">
								<Navbar.Brand className="py-3 ">OTICSHOP</Navbar.Brand>
							</LinkContainer>

							<Navbar.Toggle
								className="rounded-5 "
								aria-controls={`offcanvasNavbar-expand-${expand}`}
							/>

							<Navbar.Offcanvas
								style={{
									width: "14rem",
									fontsize: "large",
									background: "#ceceda",
									paddingTop: "4px",
									color: "black",
									fontWeight: 900
								}}
								id={`offcanvasNavbar-expand-${expand}`}
								aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
								placement="end">
								<Offcanvas.Header closeButton></Offcanvas.Header>

								<Nav>
									<SearchBox />
									<Nav className="ml-auto ">
										<LinkContainer to="/products">
											<Nav.Link>
												<i
													style={{ fontSize: 12 }}
													className="fa-solid fa-message-arrow-up-right">
													products
												</i>
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/contacts">
											<Nav.Link>
												<i
													style={{ fontSize: 12 }}
													className="fa-solid fa-message-arrow-up-right">
													contacts
												</i>
											</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/about">
											<Nav.Link>
												{" "}
												<i
													style={{ fontSize: 12 }}
													className="fa-solid fa-message-arrow-up-right">
													about
												</i>
											</Nav.Link>
										</LinkContainer>
									</Nav>
									<Nav className="m-auto"></Nav>

									<Nav className="ml-auto">
										<LinkContainer to="/cart">
											<Nav.Link>
												<i
													style={{ fontSize: 12 }}
													className="fas fa-shopping-cart">
													Cart
												</i>
											</Nav.Link>
										</LinkContainer>
										{userInfo ? (
											<NavDropdown
												title={
													<i
														style={{ fontSize: 12 }}
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
											<NavDropdown title="Admin" id="adminmenue">
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
