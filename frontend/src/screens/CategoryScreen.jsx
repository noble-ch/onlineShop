import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { listUsers } from "../actions/userActions";
import { useLocation, Link, useParams } from "react-router-dom";

function CategoryScreen() {
	const { categoryName } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;
	let keyword = location.search;

	useEffect(() => {
		dispatch(listProducts(keyword, categoryName));
		dispatch(listUsers);
	}, [dispatch, keyword, categoryName]);

	return (
		<div>
			{" "}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Container className="  rounded-4 pb-xl-5 ">
					<Container className="laptops">
						<Row className="  py-4">
							{products
								.filter((product) => product.category === categoryName) // Filter products by category
								.slice(0, 4)
								.map((product) => (
									<Col
										id="card"
										className=" borders  px-4 "
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
											<p style={{ color: "whitesmoke" }}>{product.name}</p>
											<p className="text-black-50 ">{product.price} (Birr)</p>
										</Link>
									</Col>
								))}
						</Row>
					</Container>
				</Container>
			)}
		</div>
	);
}

export default CategoryScreen;
