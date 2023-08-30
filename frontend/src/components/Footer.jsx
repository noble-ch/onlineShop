import { Container, Row, Col } from "react-bootstrap";
import GoogleTranslateComponent from "../components/GoogleTranslateComponent";




function Footer() {
	return (
		<footer className="bg-dark-subtle  ">
			<Container fluid>
      <GoogleTranslateComponent />
				<Row>
					<Row className="mt-3" sm xs>
						<Col lg={4}>
							<h5>OTICSHOP</h5>
							<p>We help you find your desired products.</p>
						</Col>
						<Col>
							<h5>Info</h5>
							<p>about</p>
							<p>Product</p>
							<p>blog</p>
						</Col>
						<Col>
							<h5>Company</h5>
							<p>Comunity</p>
							<p>Career</p>
							<p>Our story</p>
						</Col>
						<Col>
							<h5>Contact</h5>
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
