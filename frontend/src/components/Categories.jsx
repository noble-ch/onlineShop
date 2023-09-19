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
			<img
				id="products-icon"
				src="/Product_Page.png"
				alt="products"
				style={{ filter: "invert(100%)" }}
			/>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<NavDropdown  className=" text-black" title="Products">
					{getUniqueCategories(products).map((category) => (
						<NavDropdown
							className="text-black"
							title={category}
							key={category}
							// show={selectedCategory === category} // Remove this line to prevent hover effect
						>
							{getBrandsForCategory(category).map((brand) => (
								<NavDropdown.Item key={brand}>
									<Link
										className="text-capitalize text-black text-decoration-none"
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
