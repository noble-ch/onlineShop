/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import Product from "../components/Product";
import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Brands from "../components/Brands";
import ProductCarousel from "../components/ProductCarousel";
import Advertise1 from "../components/Advertise1";
import { listProducts } from "../actions/productActions";
import { listUsers } from "../actions/userActions";

import { useLocation, Link, useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import StoreReview from "../components/StoreReview";

function HomeScreen() {
	const location = useLocation();
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;
	const navigate = useNavigate();
	let keyword = location.search;

	const handleClick = () => {
		navigate("/products");
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		dispatch(listProducts(keyword));
		dispatch(listUsers);
	}, [dispatch, keyword]);

	return (
		<div>
			<Container className="mb-4">
				<Container>
					<div style={{ height: "2rem" }}></div> {/*separater */}
					<Banner />
					<Container className="mt-xl-2   " fluid>
						<Col sm lg xs md xl>
							<Row>
								<Col xs={12} sm={12} lg={6} md={6}>
									{<ProductCarousel />}
								</Col>
								<Col className="mt-xl-3 mt-md-3 " sm lg xs md xl>
									<h1 className="text-dark moto">
										Buy Any Thing From Any Where
									</h1>
									<div style={{ height: "6px" }}></div>
									<Row>
										<Col
											md={4}
											sm={3}
											xs={4}
											lg={3}
											className="mb-4  d-none d-sm-block text-dark"
											style={{
												color: "#3e3e3e",
												borderRight: "3px solid black"
											}}>
											<h2 className="text-black ">
												{/*products.length*/}&nbsp;+
											</h2>
											<h5 className="text-black">Products</h5>
										</Col>
										<Col
											style={{
												color: "#3e3e3e"
											}}
											md={2}
											sm={2}
											xs={3}
											lg={2}
											className="ps-4  d-none d-sm-block ">
											<h2 className="text-black">10 +</h2>
											<h5 className="text-black">Costumers</h5>
										</Col>
									</Row>
									<Col className="mt-sm-0  mt-xl-3 ">
										<SearchBox />
									</Col>
								</Col>
							</Row>
						</Col>
					</Container>
				</Container>
			</Container>
			<Container
				fluid
				className=" mt-2 py-3    "
				// style={{ background: "#F5F7FF" }}
			>
				<Container>
					<div className="text-center  ">
						<h3 className="text-black">New Products</h3>
						<p className="text-black">Find what you are looking for</p>
					</div>
					<div style={{ height: "3rem" }}></div>

					{loading ? (
						<Loader />
					) : error ? (
						<Message variant="danger">{error}</Message>
					) : (
						<div>
							<Row>
								{products.slice(4, 8).map((product) => (
									<Col className="" key={product._id} xs={6} sm md={6} lg xl>
										<Product product={product} />
									</Col>
								))}
							</Row>
							<div className=" d-flex  justify-content-center ">
								<Button
									className="rounded-4 my-2 py-1 d-block w-75 border-black  text-black bg-transparent border-3 "
									onClick={handleClick}>
									More products
									<i className=" px-1 fas fa-arrow-right"></i>
								</Button>
							</div>
						</div>
					)}
				</Container>
			</Container>
			<Container fluid className="  py-5">
				<div className="horizontal-scroll text-center ">
					<div className=" horizontal-scroll">
						<Col>
							<img src="./Banners/brand/br1.png" alt="chapa" />{" "}
						</Col>
						<Col>
							<img src="./Banners/brand/br2.png" alt="chapa" />{" "}
						</Col>
						<Col>
							<img src="./Banners/brand/br3.png" alt="chapa" />{" "}
						</Col>
						<Col>
							<img src="./Banners/brand/br4.png" alt="chapa" />{" "}
						</Col>
						<Col>
							<img src="./Banners/brand/br5.png" alt="chapa" />{" "}
						</Col>
						<Col>
							<img src="./Banners/brand/br6.png" alt="chapa" />{" "}
						</Col>
						<Col>
							<img src="./Banners/brand/br7.png" alt="chapa" />{" "}
						</Col>
						<Col>
							<img src="./Banners/brand/br1.png" alt="chapa" />{" "}
						</Col>
					</div>
				</div>
			</Container>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container fluid className="  bg-onador  pt-4 mb-4 pb-xl-5 ">
					<Container>
						<Row className=" py-2 ">
							<Col lg={3} md={12} sm={12} xs={12}>
								<h3 className="text-light ">Latest Samsungs</h3>
								<p className="text-light">
									Elevate your Shopping Experience: Unveiling the Best Samsung
									Products with Ease.
								</p>
								<Button
									variant="primary"
									className="rounded-4 my-2 py-1 tomato text-black"
									onClick={handleClick}>
									Find more
									<i className=" px-1 fas fa-arrow-right"></i>
								</Button>
							</Col>

							{products
								.filter((product) => product.brand === "Samsung")
								.slice(0, 4)
								.map((product) => (
									<Col
										id="card"
										className="px-3  "
										key={product._id}
										lg
										md
										sm
										xs>
										<Link
											className="text-decoration-none "
											to={`/product/${product._id}`}>
											<Image
												className="my-0 py-0"
												src={product.image}
												alt={product.name}
												fluid
											/>
											<p className="text-light fs-6 fw-bold  m-0 ">
												{product.name}
											</p>
											<p className="text-light fs-6">{product.price} (Birr)</p>
										</Link>
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="rounded-4 py-0 ">
					<Container>
						<Row className="bg-ored rounded ">
							<Col lg={3} md={12} sm={12} xs={12}>
								<div
									className="ml-2 mt-3"
									style={{
										backgroundImage: `url('./Banners/msiBanner.jpg')`,
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										backgroundPosition: "center",
										padding: "40px",
										color: "white",
										height: "100%"
									}}>
									<h3 className="text-white">MSI Laptops</h3>
									<Link
										t
										variant="light"
										className="rounded-4 my-1 text-white"
										onClick={handleClick}>
										Find more <i className="px-1 fas fa-arrow-right"></i>
									</Link>
								</div>
							</Col>

							{products
								.filter((product) => product.brand === "Msi")
								.filter((product) => product.category === "Laptops")
								.map((product) => (
									<Col
										className="my-3 bg-white mx-3 rounded-3 shadow "
										key={product._id}
										xs
										sm
										md
										lg
										xl>
										<Product product={product} />
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}
			<Container fluid className="my-3 p-3 d-flex justify-content-around ">
				<img src="./Banners/smallmsi.png" alt="chapa" />{" "}
			</Container>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container>
					<Container>
						<Row className="bg-ored  rounded">
							<Col className="" lg={3} md={12} sm={12} xs={12}>
								<div
									className="ml-2 mt-3"
									style={{
										backgroundImage: `url('./Banners/msidesktop.jpg')`,
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										backgroundPosition: "center",
										padding: "40px",
										color: "white",
										height: "100%"
									}}>
									<h3 className="text-white">MSI Desktops</h3>
									<Link
										t
										variant="light"
										className="rounded-4 my-1 text-white"
										onClick={handleClick}>
										Find more <i className="px-1 fas fa-arrow-right"></i>
									</Link>
								</div>
							</Col>

							{products
								.filter((product) => product.brand === "Msi")
								.filter((product) => product.category === "Desktops")
								.map((product) => (
									<Col
										className="my-3 bg-white  mx-3 rounded-3 shadow "
										key={product._id}
										xs
										sm
										md
										lg
										xl>
										<Product product={product} />
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}

			<Advertise1 />
			<Image fluid src="./Banners/corei7.png" alt="chapa" />
			<Container fluid style={{ background: "#F5F7FF" }}>
				<StoreReview />
			</Container>
			<Image fluid src="./Banners/customerservice.png" alt="customerservice" />
			<div className="bg-body-secondary ">
				<div style={{ height: "1rem" }}></div> {/*separater */}
				<AboutUs />
			</div>

			<Image fluid src="./Banners/feature.png" alt="features" />

			{/* <div style={{ height: "5rem" }}></div> */}
		</div>
	);
}

export default HomeScreen;
