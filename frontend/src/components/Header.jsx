/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
	Navbar,
	Nav,
	Container,
	NavDropdown,
	Offcanvas,
	Carousel,
	Image
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBoxHeader from "./SearchBoxHeader";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import GoogleTranslateComponent from "../components/GoogleTranslateComponent";

function Header() {
	const navigate = useNavigate();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<header
			style={{
				// fontFamily: "rocko",
				// background: "red",
				height: "6rem"
			}}>
			<Navbar
				fixed="top"
				style={{ height: "2rem" }}
				className="bg-black w-100 py-2 text-capitalize d-flex flex-wrap   ">
				<Container className="d-flex  ">
					<Carousel
						prevIcon
						nextIcon
						indicators={false}
						interval={2000}
						pause="hover"
						className="py-0 my-0 ">
						<Carousel.Item key="visit">
							<p className="text-white fs-6 ">
								Visit our showroom in adama address 00
							</p>
						</Carousel.Item>{" "}
						<Carousel.Item key="oticnamefull">
							<p className="text-white fs-6">
								Oromia technology and incubation center
							</p>
						</Carousel.Item>
						<Carousel.Item key="scurePlatform">
							<p className="text-white fs-6">A secure OnlineShoping Platform</p>
						</Carousel.Item>
						<Carousel.Item key="contact">
							<a href="/" className="text-white text-center fs-6 ">
								Contact Us
							</a>
						</Carousel.Item>
						<Carousel.Item key="phoneNum">
							<p className="text-capitalize fs-6">
								call Us: +2519-123-456-78 &nbsp;&nbsp;
							</p>
						</Carousel.Item>
						<Carousel.Item key="ig">
							<a href="https://instagram.com">
								<span className="fa-brands fa-instagram  text-white fs-4">
									&nbsp;&nbsp;&nbsp;
								</span>
							</a>
							<a href="https://fb.com">
								{" "}
								<span className="fa-brands fa-facebook text-white  text-white fs-4">
									&nbsp;&nbsp;&nbsp;
								</span>
							</a>
							<a href="https://telegram.com">
								<span className="fa-brands fa-telegram  text-white fs-4">
									&nbsp;&nbsp;&nbsp;
								</span>
							</a>
							<a href="https://youtube.com">
								<span className="fa-brands fa-youtube  text-white fs-4">
									&nbsp;&nbsp;&nbsp;
								</span>
							</a>
						</Carousel.Item>
					</Carousel>
				</Container>
			</Navbar>
			<Container className=" p-0   ">
				{["md"].map((expand) => (
					<Navbar
						fixed="top"
						variant="dark"
						collapseOnSelect
						key={expand}
						expand={expand}
						style={{
							// background: "#F5F7FF",
							// background: "rgba(0, 0, 0, 1)",
							backdropFilter: "blur(5px)",
							marginTop: "2rem",
							height: "4rem"
						}}
						className="   p-0 bg-oblue-gradient ">
						<Container>
							<LinkContainer
								className="border  p-1  bg-body-secondary  p-0 rounded-circle"
								to="/">
								<Navbar.Brand className="p-0 m-0  ">
									<Image
										style={{ height: "40px", width: "40px" }}
										src="/favicon.png"
										alt="features"
									/>
								</Navbar.Brand>
							</LinkContainer>
							<LinkContainer to="/">
								<Nav.Link>
									<span
										style={{ fontSize: 16 }}
										className="fas fa-home d-md-none text-white "></span>
								</Nav.Link>
							</LinkContainer>
							<div
								className=" d-md-none text-white d-flex  "
								style={{ width: "2rem" }}>
								<Categories />
							</div>
							<LinkContainer to="/contacts">
								<Nav.Link>
									<span
										style={{ fontSize: 16 }}
										className="fa-solid fa-circle-question d-md-none text-white "></span>
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link className="cart">
									<span
										style={{ fontSize: 16 }}
										className="fas fa-shopping-cart  d-md-none text-white"></span>
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
								className="bg-oblue  "
								style={{
									width: "60%",
									fontsize: 40,
									background: "#2e3158",
									backdropFilter: "blur(6px)",
									paddingTop: "4px",
									paddingLeft: "4px",
									color: "white",
									fontWeight: 900
								}}
								id={`offcanvasNavbar-expand-${expand}`}
								aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
								placement="end">
								<Offcanvas.Header closeButton className=" my-0 py-3">
									OTICSHOP
								</Offcanvas.Header>

								<Nav>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<SearchBoxHeader />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<Nav className="ml-auto fs-6 text-capitalize  ">
										<LinkContainer to="/">
											<Nav.Link className="d-flex justify-content-start ">
												<span
													style={{ fontSize: 16 }}
													className="fas fa-home  "></span>
												<span>&nbsp;Home</span>
											</Nav.Link>
										</LinkContainer>
										<div>
											<Categories />
										</div>
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
				{/* <Categories /> */}
			</Container>
		</header>
	);
}

export default Header;
