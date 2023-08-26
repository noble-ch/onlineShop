import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer  style={{ background: "darkGray" ,fontFamily:'CustomFont' }}>
      <Container fluid>
        <Row>
          <Row>
            <Col lg={4}>
              <h1>OTICSHOP</h1>
              <p>We help you find your desired products.</p>
            </Col>
            <Col>
              <h1>Information</h1>
              <p>about</p>
              <p>Product</p>
              <p>blog</p>
            </Col>
            <Col>
              <h1>Company</h1>
              <p>Comunity</p>
              <p>Career</p>
              <p>Our story</p>
            </Col>
            <Col>
              <h1>Contact</h1>
              <p>Getting Started</p>
              <p>Pricing</p>
              <p>Resources</p>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col className="text-center py-3">
            2023 all Right Reserved Term of use OTICSHOP &copy;
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
