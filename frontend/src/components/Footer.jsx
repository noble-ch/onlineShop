import { Container, Row, Col } from "react-bootstrap";
function Footer() {
	return (
		<footer className="bg-black">
			<Container>
				<Row>
					<Row className="mt-3" sm xs>
						<Col lg={4}>
							<h5 className="text-light m-0">OTICSHOP</h5>
							<p>We help you find your desired products.</p>
						</Col>
						<Col>
							<h5 className="text-light  m-0 ">Info</h5>
							<p className="m-0">about</p>
							<p className="m-0">Product</p>
							<p className="m-0">blog</p>
						</Col>
						<Col>
							<h5 className="text-light m-0 ">Company</h5>
							<p className="m-0">Comunity</p>
							<p className="m-0">Career</p>
							<p className="m-0">Our story</p>
						</Col>
						<Col>
							<h5 className="text-light m-0 ">Contact</h5>
							<p className="m-0">Getting Started</p>
							<p className="m-0">Pricing</p>
							<p className="m-0">Resources</p>
						</Col>
					</Row>
				</Row>
				<Row>
					<Col className="text-center py-2">
						2023 all Right Reserved Term of use OTICSHOP &copy;
					</Col>
				</Row>
			</Container>
			<Container fluid className="d-flex justify-content-end ">
				
			</Container>
		</footer>
	);
}

export default Footer;
