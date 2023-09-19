import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import PriceFilter from "../components/PriceFilter";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";
import Brands from '../components/Brands';


function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;

  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProductsByPrice = (min, max) => {
    const filtered = products.filter(
      (product) => product.price >= min && product.price <= max
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const isFilterApplied = filteredProducts.length > 0;

  return (
    <Container >
      <Brands/>
     
      <PriceFilter filterProducts={filterProductsByPrice} />
      <Row>
       
        <Col className="border d-flex justify-content-between">
          <Container fluid>
            <h1>Latest Products</h1>

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div>
                <Row className="d-flex justify-content-around">
                  {(isFilterApplied ? filteredProducts : products).map(
                    (product) => (
                      <Col
                        className="m-2 rounded-4"
                        key={product._id}
                        xs
                        sm
                        md
                        lg={4}
                        xl={3}
                      >
                        <Product product={product} />
                      </Col>
                    )
                  )}
                </Row>
                <Paginate
                  page={page}
                  pages={pages}
                  keyword={keyword}
                />
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeScreen;
