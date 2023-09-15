/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

function Categories() {
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;
	const getUniqueCategories = (products) => {
		const uniqueCategories = new Set();
		products.forEach((product) => {
			uniqueCategories.add(product.category);
		});
		return Array.from(uniqueCategories);
	};

	return (
		<Navbar
			className="text-center text-black d-flex justify-content-center  pb-2"
			style={{
				marginTop: "5rem",
				maxWidth: "100vw",
				overflowX: "auto",
				whiteSpace: "nowrap"
			}}>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Nav className="justify-content-between  w-100  text-black">
					{getUniqueCategories(products).map((category) => (
						<Nav.Link
							id="categories"
							className="text-capitalize text-black "
							key={category}>
							<Link
								className="text-capitalize text-black text-decoration-none "
								to={`/categories/${category}`}>
								<span>{category}</span>
							</Link>
						</Nav.Link>
					))}
				</Nav>
			)}
		</Navbar>
	);
}

export default Categories;
