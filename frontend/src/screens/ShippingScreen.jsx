/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const dispatch = useDispatch();

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate("/payment");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label className="text-black">Address</Form.Label>
					<Form.Control
						required className="bg-transparent  border-bottom px-0 py-1 mx-0 "
						type="text"
						placeholder="Enter address"
						value={address ? address : ""}
						onChange={(e) => setAddress(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label className="text-black">City</Form.Label>
					<Form.Control className="bg-transparent  border-bottom px-0 py-1 mx-0 "
						required
						type="text"
						placeholder="Enter city"
						value={city ? city : ""}
						onChange={(e) => setCity(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId="postalCode">
					<Form.Label className="text-black">Postal Code</Form.Label>
					<Form.Control className="bg-transparent  border-bottom px-0 py-1 mx-0 "
						required
						type="text"
						placeholder="Enter postal code"
						value={postalCode ? postalCode : ""}
						onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label className="text-black">Country</Form.Label>
					<Form.Control className="bg-transparent  border-bottom px-0 py-1 mx-0 "
						required
						type="text"
						placeholder="Enter country"
						value={country ? country : ""}
						onChange={(e) => setCountry(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary" className="py-1 px-1 my-2 rounded tomato text-black">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
}

export default ShippingScreen;
