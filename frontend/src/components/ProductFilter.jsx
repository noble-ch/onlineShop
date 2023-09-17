// ProductFilter.js

import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

const ProductFilter = () => {
	const [filters, setFilters] = useState({
		minPrice: "",
		maxPrice: "",
		category: "",
		brand: ""
	});

	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error } = productList;

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters({
			...filters,
			[name]: value
		});
	};

	const handleFilterSubmit = (e) => {
		e.preventDefault();
		// Dispatch an action to fetch filtered products based on filters
		dispatch(listProducts(filters));
	};

	return (
		<Container className="my-3">
			<h3>Product Filter</h3>
			<Form onSubmit={handleFilterSubmit}>
				<Row>
					<Col xs={12} md={3}>
						<Form.Group controlId="minPrice">
							<Form.Label>Min Price</Form.Label>
							<Form.Control
								type="number"
								name="minPrice"
								value={filters.minPrice}
								onChange={handleFilterChange}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={3}>
						<Form.Group controlId="maxPrice">
							<Form.Label>Max Price</Form.Label>
							<Form.Control
								type="number"
								name="maxPrice"
								value={filters.maxPrice}
								onChange={handleFilterChange}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={3}>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								name="category"
								value={filters.category}
								onChange={handleFilterChange}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={3}>
						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								name="brand"
								value={filters.brand}
								onChange={handleFilterChange}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Button variant="primary" type="submit">
					Apply Filters
				</Button>
			</Form>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
		</Container>
	);
};

export default ProductFilter;
