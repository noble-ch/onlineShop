import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <Row bg='dark' className="blkgrdt ">
        <Row className="justify-content-center align-items-center ">
          <Col xs={12} md={12}>
            <div className="text-center">
              <h1 style={{color:'white'}}>About us</h1>
              <p>Order now and appreciate the quality of our service</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center text-center">
          <Col className="d-flex flex-column align-items-center text-center">
            <div className="circle"></div>
            <h4 style={{color:'white', border:'red'}}>Large Assortment</h4>
            <p>
              We offer many different types of products with fewer variations in
              each category.
            </p>
          </Col>
          <Col className="d-flex flex-column align-items-center text-center">
            <div className="circle"></div>
            <h4 style={{color:'white', }}>Large Assortment</h4>
            <p>
              we offer many deffernet types of products with fewer variations in
              each category.
            </p>
          </Col>
          <Col className="d-flex flex-column align-items-center text-center ">
            <div className="circle"></div>
            <h4 style={{color:'white', border:'red'}}>24/7 Support</h4>
            <p>
              we offer many deffernet types of products with fewer variations in
              each category.
            </p>
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default HomeScreen;
