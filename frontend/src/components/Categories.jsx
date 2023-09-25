import { useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
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

	// const [selectedCategory, setSelectedCategory] = useState(null);

	const getBrandsForCategory = (category) => {
		const brandsInCategory = new Set();
		products.forEach((product) => {
			if (product.category === category) {
				brandsInCategory.add(product.brand);
			}
		});
		return Array.from(brandsInCategory);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<NavDropdown
					menuVariant="dark"
					className="m-0  d-flex"
					title={
						<span>
							<img
								src="/Product_Page.png"
								alt="products"
								style={{
									height: "17px",
									marginTop: "-4px",
									filter: "invert(100%)"
								}}
							/>{" "}
							<span className="d-none d-lg-inline-block ">Products</span>
						</span>
					}>
					{getUniqueCategories(products).map((category) => (
						<NavDropdown
							menuVariant="dark "
							className="bg-oblue p-0 m-0 "
							title={category}
							key={category}
							// show={selectedCategory === category} // Remove this line to prevent hover effect
						>
							{getBrandsForCategory(category).map((brand) => (
								<NavDropdown.Item className="bg-oblue" key={brand}>
									<Link
										className="text-capitalize text-white  text-decoration-none"
										to={`/categories/${category}/brands/${brand}`}>
										{brand}
									</Link>
								</NavDropdown.Item>
							))}
						</NavDropdown>
					))}
				</NavDropdown>
			)}
		</>
	);
}

export default Categories;
