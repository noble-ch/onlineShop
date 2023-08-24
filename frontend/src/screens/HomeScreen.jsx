import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";
import SearchBox from "../components/SearchBox";

function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <div className="rounded rounded-5 p-4  gradient_border">
        <div id="home_moto">
          <Row>
            <Col
              sm={12}
              lg={6}
              className="display-2 font-weight-bold"
              style={{ color: "#000", fontFamily: "Arial", fontWeight: 600 }}>
              Buy Any Thing From Any Where
              <div style={{ height: "2rem" }}></div>
              <SearchBox />
            </Col>

            <Col sm={12} lg={6}>
              {!keyword && <ProductCarousel />}
            </Col>
            <Col
              md={2}
              className="mb-5"
              style={{
                color: "black",
                fontWeight: "extrabold",
                borderRight: "1px solid black"
              }}>
              <h1>50+</h1>
              <h4>items</h4>
            </Col>
            <Col className="ps-4">
              <h1>100+</h1>
              <h4>Costumers</h4>
            </Col>
          </Row>
          <Row></Row>
        </div>
      </div>

      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
