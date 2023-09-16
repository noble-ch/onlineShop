import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import PriceFilter from "../components/PriceFilter";

import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

function HomeScreen() {
	const location = useLocation();
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products, page, pages } = productList;

	let keyword = location.search;

	const [filteredProducts, setFilteredProducts] = useState(products);
	const filterProductsByPrice = (min, max) => {
		const filtered = products.filter(
			(product) => product.price >= min && product.price <= max
		);
		setFilteredProducts(filtered);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);
	console.log(productList);
	return (
		<Container fluid>
			<PriceFilter filterProducts={filterProductsByPrice} />
			<Row>
				{" "}
				<Col xs sm md={2} lg={2} xl={2} className="d-none d-sm-block ">
					<Container className="my-5 py-5 px-0 1 d-flex flex-column  justify-content-center align-items-center ">
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br1.png"
								alt="chapa"
							/>{" "}
						</Col>
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br2.png"
								alt="chapa"
							/>{" "}
						</Col>
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br3.png"
								alt="chapa"
							/>{" "}
						</Col>
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br4.png"
								alt="chapa"
							/>{" "}
						</Col>
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br5.png"
								alt="chapa"
							/>{" "}
						</Col>
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br6.png"
								alt="chapa"
							/>{" "}
						</Col>
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br7.png"
								alt="chapa"
							/>{" "}
						</Col>
						<Col>
							<img
								style={{ height: "4rem" }}
								src="./Banners/brand/br1.png"
								alt="chapa"
							/>{" "}
						</Col>
					</Container>
				</Col>
				<Col className="   border  d-flex justify-content-between ">
					<Container fluid>
						<h1>Latest Products</h1>

						{loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger">{error}</Message>
						) : (
							<div>
								<Row className="d-flex justify-content-around ">
									{filteredProducts.map((product) => (
										<Col
											className=" m-2  rounded-4 "
											key={product._id}
											xs
											sm
											md
											lg={4}
											xl={3}>
											<Product product={product} />
										</Col>
									))}
								</Row>
								<Paginate page={page} pages={pages} keyword={keyword} />
							</div>
						)}
					</Container>
				</Col>
				<Col xs sm md lg={1} xl={1} className="d-none d-lg-block ">
					hello
				</Col>
			</Row>
		</Container>
	);
}

export default HomeScreen;
