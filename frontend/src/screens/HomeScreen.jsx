/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import Product from "../components/Product";
import AboutUs from "../components/AboutUs";
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
			{/* <div className="home-back"> </div> */}
			{/* <Parallax strength={-300} bgImage={Woman}> */}
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
											className="ps-4 d-none d-sm-block ">
											<h2 className="text-black">10 +</h2>
											<h5 className="text-black">Costumers</h5>
										</Col>
									</Row>

									<SearchBox />
								</Col>
								<Col xs={12} sm={12} lg={6} md={6}>
									{<ProductCarousel />}
								</Col>
							</Row>
						</Col>
					</Container>
				</Container>
				<div style={{ height: "3.5rem" }}></div> {/*separater */}
			</Container>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="    rounded-4 pb-xl-5 ">
					<Container className="laptops">
						<Row className="  py-4">
							<Col lg={3} md={12} sm={12} xs={12}>
								<h3 className="text-dark ">Latest Apple</h3>
								<p className="text-dark">
									Elevate your Shopping Experience: Unveiling the Best Apple Products with
									Ease.
								</p>
								<Button
									variant="primary"
									className="rounded-4 my-1"
									onClick={handleClick}>
									Find more
									<i className=" px-1 fas fa-arrow-right"></i>
								</Button>
							</Col>

							{products.filter((product) => product.brand === "Apple")
								.slice(0, 4)
								.map((product) => (
									<Col
										id="card"
										className="  px-4 "
										key={product._id}
										lg
										md
										sm
										xs>
										<Link id="product_name" to={`/product/${product._id}`}>
											<Image
												className="my-3 rounded-3 "
												src={product.image}
												alt={product.name}
												fluid
											/>
											<p className="text-black">{product.name}</p>
											<p className="text-black-50 ">{product.price} (Birr)</p>
										</Link>
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}
			{/* </Parallax> */}
			{/* <Parallax strength={400} blur={{ min: -5, max: 15 }} bgImage={Woman2}> */}
			<div
				style={{ background: "#111111" }}
				className="hello "
				// style={{
				// 	background: "rgba(32, 35, 47, 0.3)",
				// 	backdropFilter: "blur(10px)"
				// }}
			>
				<div style={{ height: "3.5rem" }}></div> {/*separater */}
				<AboutUs />
			</div>
			{/* </Parallax> */}
			{/*separater */}
			{/* <Container fluid className="clasic"></Container> */}
			<div style={{ height: "3rem" }}></div>
			<Container>
				{/* <Container>
					<img
						src="/Ellipse 7.svg"
						alt="arrow"
						className="ml-2   "
						style={{ position: "absolute", zIndex: "-1" }}
					/>
					<img
						src="/Ellipse 7.svg"
						alt="arrow"
						className="ml-2  arrows    "
						style={{ position: "absolute", zIndex: "-1" }}
					/>
				</Container> */}
				<div
					className="text-center  "
					// style={{ color: "white", zIndex: "2", position: "relative" }}
				>
					<h3 className="text-dark">Featured Products</h3>
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
								variant="light"
								className="rounded-4 d-block w-75 "
								onClick={handleClick}>
								More products
								<i className=" px-1 fas fa-arrow-right"></i>
							</Button>
						</div>
					</div>
				)}
			</Container>
			<div style={{ height: "5rem" }}></div>
		</div>
	);
}

export default HomeScreen;
