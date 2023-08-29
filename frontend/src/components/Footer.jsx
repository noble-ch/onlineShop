import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer  style={{ background: "darkGray" ,fontFamily:'CustomFont' }}>
      <Container fluid>
        <Row>
          <Row className="mt-3" sm xs>
            <Col lg={4}>
              <h4 >OTICSHOP</h4>
              <p>We help you find your desired products.</p>
            </Col>
            <Col>
              <h4>Info</h4>
              <p>about</p>
              <p>Product</p>
              <p>blog</p>
            </Col>
            <Col>
              <h4>Company</h4>
              <p>Comunity</p>
              <p>Career</p>
              <p>Our story</p>
            </Col>
            <Col>
              <h4>Contact</h4>
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
