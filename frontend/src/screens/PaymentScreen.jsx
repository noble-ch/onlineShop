import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

function PaymentScreen() {
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const dispatch = useDispatch();

	const [paymentMethod, setPaymentMethod] = useState("Chapa");

	if (!shippingAddress.address) {
		navigate("/login?redirect=/shipping");
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/login?redirect=/placeorder");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />

			<Form onSubmit={submitHandler}>
				<Form.Group className="mb-3">
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<div className="d-flex align-items-center">
							<Form.Check
								type="radio"
								label=""
								id="Chapa"
								name="paymentMethod"
								checked
								onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
							<img
								src="/chapaLogo.png"
								alt="chapa"
								className="ml-2 bg-white rounded"
								style={{ width: "100px", height: "30px" }}
							/>
				
						</div>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary" className="rounded-3 px-2 py-1 tomato text-black">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
}

export default PaymentScreen;
