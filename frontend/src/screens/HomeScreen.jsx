/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import Product from "../components/Product";
import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { listUsers } from "../actions/userActions";

import { useLocation, Link, useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";

import { Parallax } from "react-parallax";
import Woman from "../components/woman.jpg";
import Woman2 from "../components/woman2.jpg";

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
		
			<Container>
				<Container>
					<Container className="mt-xl-5 " fluid="true">
						<Col sm lg xs md xl>
							<Row>
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
											<h2 className="text-black ">{products.length}&nbsp;+</h2>
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
									<Col className="mt-sm-0  mt-xl-3 ">	<SearchBox /></Col>
								
								</Col>
								<Col  xs={12} sm={12} lg={6} md={6}>
									{<ProductCarousel />}
									<h1 className="text-center  fs-4">top Rated</h1>
								</Col>
							</Row>
						</Col>
					</Container>
				</Container>
				<Banner />
				<div style={{ height: "3.5rem" }}></div>
			</Container>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="   rounded-4 pb-xl-5 ">
					<Container>
						<Row className=" py-4">
							<Col lg={3} md={12} sm={12} xs={12}>
								<h3 className="text-dark ">Latest Samsungs`</h3>
								<p className="text-dark">
									Elevate your Shopping Experience: Unveiling the Best Samsung
									Products with Ease.
								</p>
								<Button
									variant="primary"
									className="rounded-4 my-1"
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
										className="px-0  "
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
											<p className="text-black fs-6 fw-bold  m-0 ">
												{product.name}
											</p>
											<p className="text-black fs-6">{product.price} (Birr)</p>
										</Link>
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}

			<div style={{ height: "3rem" }}></div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className=" rounded-4 pb-xl-5 ">
					<Container>
						<Row className=" py-4">
							<Col lg={3} md={12} sm={12} xs={12}>
								<div
									className="ml-2 mt-3"
									style={{
										backgroundImage: `url('./Banners/msiBanner.jpg')`,
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										backgroundPosition: "center",

										padding: "40px",

										color: "white"
									}}>
									<div style={{ height: "2rem" }}></div>
									<h3 className="text-white">MSI Laptops</h3>
									<Link
										t
										variant="light"
										className="rounded-4 my-1 text-white"
										onClick={handleClick}>
										Find more <i className="px-1 fas fa-arrow-right"></i>
									</Link>
									<div style={{ height: "6rem" }}></div>
								</div>
							</Col>

							{products
								.filter((product) => product.brand === "Msi")
								.map((product) => (
									<Col key={product._id} xs sm md lg xl>
										<Product product={product} />
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}
			
			<div style={{ height: "3rem" }}></div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="   rounded-4 pb-xl-5 ">
					<Container>
						<Row className=" py-4">
							<Col lg={3} md={12} sm={12} xs={12}>
								<div
									className="ml-2 mt-3"
									style={{
										backgroundImage: `url('./Banners/msidesktop.jpg')`,
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										backgroundPosition: "center",

										padding: "40px",

										color: "white"
									}}>
									<div style={{ height: "2rem" }}></div>
									<h3 className="text-white">MSI Desktops</h3>
									<Link
										t
										variant="light"
										className="rounded-4 my-1 text-white"
										onClick={handleClick}>
										Find more <i className="px-1 fas fa-arrow-right"></i>
									</Link>
									<div style={{ height: "6rem" }}></div>
								</div>
							</Col>

							{products
								.filter((product) => product.brand === "MsiDesktop")
								.map((product) => (
									<Col key={product._id} xs sm md lg xl>
										<Product product={product} />
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}
			<Container className="shadow mt-2 py-3 bg-body-tertiary ">
				<div className="text-center  ">
					<h3 className="text-dark">Latest Products</h3>
					<p className="text-dark">Find what you are looking for</p>
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
								<Col key={product._id} xs={6} sm md={6} lg xl>
									<Product product={product} />
								</Col>
							))}
						</Row>
						<div className=" d-flex justify-content-center ">
							<Button
								variant="dark"
								className="rounded-4 d-block w-75 "
								onClick={handleClick}>
								More products
								<i className=" px-1 fas fa-arrow-right"></i>
							</Button>
						</div>
					</div>
				)}
			</Container>
			<div className="bg-black">
				<div style={{ height: "3.5rem" }}></div> {/*separater */}
				<AboutUs />
			</div>
			{/* <div style={{ height: "5rem" }}></div> */}
		</div>
	);
}

export default HomeScreen;
