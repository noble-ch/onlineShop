import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import PriceFilter from "../components/PriceFilter";

import { listProducts } from "../actions/productActions";
import { listUsers } from "../actions/userActions";
import { useLocation, useParams } from "react-router-dom";
import Brands from '../components/Brands';


function CategoryScreen() {
	const { categoryName } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;
	let keyword = location.search;

	const [filteredProducts, setFilteredProducts] = useState(products);
	const filterProductsByPrice = (min, max) => {
		const filtered = products.filter(
			(product) => product.price >= min && product.price <= max
		);
		setFilteredProducts(filtered);
	};

	useEffect(() => {
		dispatch(listProducts(keyword, categoryName));
		dispatch(listUsers);
	}, [dispatch, keyword, categoryName]);

	return (
		<div>
			<Brands/>
			<PriceFilter filterProducts={filterProductsByPrice} />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="  rounded-4 ">
					<Container>
						<Row className="  py-4">
							{loading ? (
								<Loader />
							) : error ? (
								<Message variant="danger">{error}</Message>
							) : (
								<div>
									<Row>
										{filteredProducts
											.filter((product) => product.category === categoryName)
											.map((product) => (
												<Col key={product._id} xs sm md lg xl>
													<Product product={product} />
												</Col>
											))}
									</Row>
								</div>
							)}
						</Row>
					</Container>
				</Container>
			)}
		</div>
	);
}

export default CategoryScreen;
