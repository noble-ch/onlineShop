import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Container } from "react-bootstrap";
import Product from "../components/Product";
import AboutUs from "../components/AboutUs";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { useLocation, Link } from "react-router-dom";
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
    <div className=" ">
      <img
        src="/Vector1.svg"
        alt="arrow"
        className="ml-2 arrows1  "
        style={{ position: "absolute" }}
      />
      <img
        src="/Vector2.svg"
        alt="arrow"
        className="ml-2  arrows  "
        style={{ position: "absolute" }}
      />
      <Container className="gradient-border ">
        <div className="rounded rounded-5 ">
          <div className="rounded rounded-5 p-4  ">
            <div id="home_moto">
              <Row>
                <Col
                  sm={12}
                  lg={6}
                  xs={12}
                  md={6}
                  className="display-2 font-weight-bold"
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Arial",
                    fontWeight: 600
                  }}>
                  Buy Any Thing From Any Where
                  <div style={{ height: "1rem" }}></div>
                  <Row>
                    <Col
                      md={4}
                      sm={3}
                      xs={4}
                      lg={3}
                      className="mb-5"
                      style={{
                        color: "#3e3e3e",
                        fontWeight: "extrabold",
                        borderRight: "3px solid black"
                      }}>
                      <h1>50+</h1>
                      <h4>items</h4>
                    </Col>
                    <Col md={2} sm={2} xs={3} lg={2} className="ps-4">
                      <h1>100+</h1>
                      <h4>Costumers</h4>
                    </Col>
                  </Row>
                  <SearchBox />
                </Col>

                <Col xs={12} sm={12} lg={6} md={6}>
                  {<ProductCarousel />}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div style={{ height: "4rem" }}></div> {/*separater */}
        <Row>
          <Col lg={3} md={3} sm={12} xs={12}>
            <h1>Latest Products</h1>
            <p>
              Elevate ur Shopping Experience: Unveiling Best Sellers with Ease.
            </p>
          </Col>

          {products.slice(0, 3).map((product) => (
            <Col
              className="px-1 mx-3  "
              key={product._id}
              lg={2}
              md={2}
              sm={3}
              xs={3}>
              <Link id="product_name" to={`/product/${product._id}`}>
                <Image
                  className="my-2"
                  style={{
                    padding: "2px",

                    background: "lightGray",
                    borderRadius: "1rem"
                  }}
                  src={product.image}
                  alt={product.name}
                  fluid
                />
                {/* <h6>{product.name}</h6> */}
                <h6>${product.price}</h6>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <AboutUs />
      <div style={{ height: "10rem" }}></div> {/*separater */}
      <Container fluid className="clasic"></Container>
      <Container>
        <h1>Featured Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Row className="mx-5 px-6 ">
              {products.slice(4, 8).map((product) => (
                <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        )}
      </Container>
      <div style={{ height: "10rem" }}></div> {/*separater */}
    </div>
  );
}

export default HomeScreen;
