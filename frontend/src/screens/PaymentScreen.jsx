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

  const [paymentMethod, setPaymentMethod] = useState("TeleBirr");

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
                id="telebirr"
                name="paymentMethod"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
              <img
                src="/TeleBirr.svg"
                alt="TeleBirr"
                className="ml-2"
                style={{ width: "100px", height: "48px" }}
              />
            </div>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
