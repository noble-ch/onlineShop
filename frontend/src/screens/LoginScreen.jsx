import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import ProductCarousel from "../components/ProductCarousel";


function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    console.log("submited");
  };

  return (
    <Container>
      <Row >
        <Col  xs={12} sm={12} md={12} ls xl>
          <FormContainer>
            <div className="my-4"></div>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group  controlId="email">
                <Form.Label className="hello">Email Address</Form.Label>
                <Form.Control  className="bg-transparent border-bottom p-0  foci"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control className="bg-transparent border-bottom p-0"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="rounded-5 my-2 px-3 py-1" >
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer?
                <Link
                  to={
                    redirect ? `/register?redirect=${redirect}` : "/register"
                  }>
                  Register
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Col>
        <Col xs sm md lg xl>
          <ProductCarousel />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
