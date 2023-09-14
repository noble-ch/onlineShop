import { Row, Col } from "react-bootstrap";

function HomeScreen() {


	return (
		<div>
			<Row>
				<Row className="justify-content-center align-items-center ">
					<Col xs={12} md={12}>
						<div className="text-center">
							<h3 style={{ color: "white", padding: "0" }}>About us</h3>
							<big style={{ color: "white", padding: "0" }}>
								Order now and appreciate the quality of our service
							</big>
						</div>
					</Col>
				</Row>
				<Row className="justify-content-center align-items-center text-center mt-3 ">
					<Col className="d-flex flex-column align-items-center text-center">
						<div className="circle">
							{" "}
							<i
								className="fas fa-chart-simple m-2  text-light"
								style={{ fontSize: 40 }}></i>
						</div>
						<h4 className=" text-light">Large Assortment</h4>
						<p className=" text-light">
							We offer many different types of products with fewer variations in
							each category.
						</p>
					</Col>
					<Col className="d-flex flex-column align-items-center text-center">
						<div className="circle">
							{" "}
							<i
								className="fas fa-truck  mt-3 mx-3 text-light"
								style={{ fontSize: 30 }}></i>
						</div>
						<h4 className=" text-light">Fast & Secure Shipping</h4>
						<p className=" text-light">
							4-day or less delivery time, free shipping and an expedited
							delivery option.
						</p>
					</Col>
					<Col className="d-flex flex-column align-items-center text-center ">
						<div className="circle">
							<i className="fas fa-phone  m-3  text-light" style={{ fontSize: 35 }}></i>
						</div>
						<h4 className=" text-light">24/7 Support</h4>
						<p className=" text-light">
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
