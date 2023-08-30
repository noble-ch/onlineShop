import { Parallax } from "react-parallax";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import Woman from "../components/woman.jpg";

function ContactScreen() {
	return (
		<div className="contact-screen-container">
			<Parallax strength={300} bgImage={Woman}>
				<Container fluid className="vh-100 d-flex flex-column">
					<div className="flex-grow-1"></div>
					<div className="my-5 text-black ">
						<AboutUs />
					</div>
					<div>
						<Footer />
					</div>
				</Container>
			</Parallax>
		</div>
	);
}

export default ContactScreen;
