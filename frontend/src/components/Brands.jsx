/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

function Brands() {
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;
	const getUniqueBrands = (products) => {
		const uniqueBrands = new Set();
		products.forEach((product) => {
			uniqueBrands.add(product.brand);
		});
		return Array.from(uniqueBrands);
	};

	return (
		<Container>
			<Navbar
				className=" text-black d-flex justify-content-around  p-0"
				style={{
					overflowX: "auto",
					whiteSpace: "nowrap",
					maxWidth: "100vw",

				}}>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Nav className="  justify-content-between  w-100  text-black">
						{getUniqueBrands(products).map((brand) => (
							<Nav.Link className="text-capitalize text-black " key={brand}>
								<Link id="categories"
									className="text-capitalize text-black text-decoration-none  "
									to={`/brands/${brand}`}>
									<span className="text-dark fs-5">{brand}</span>
								</Link>
							</Nav.Link>
						))}
					</Nav>
				)}
			</Navbar>
		</Container>
	);
}

export default Brands;
