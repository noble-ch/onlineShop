import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBoxHeader() {
	const [keyword, setKeyword] = useState("");
	const [isSearchVisible, setSearchVisible] = useState(false);

	let navigate = useNavigate();
	const location = useLocation();

	const toggleSearch = () => {
		setSearchVisible(!isSearchVisible);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword) {
			navigate(`/products/?keyword=${keyword}&page=1`);
		} else {
			navigate(navigate(location.pathname));
		}
	};

	return (
		<Form onSubmit={submitHandler} className="d-flex">
			<Form.Control
				id="search-field"
				type="search"
				name=" "
				placeholder="Search Products..."
				onChange={(e) => setKeyword(e.target.value)}
				className="mr-2 w-100 w-sm-auto py-1 px-3 custom-placeholder"
				style={{ fontSize: "14px" }}
			/>

			<Button onClick={toggleSearch} id="search-button" type="submit">
				<i className="fas text-white fa-search"></i>
			</Button>
		</Form>
	);
}

export default SearchBoxHeader;
