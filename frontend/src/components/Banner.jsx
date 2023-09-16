import { Carousel, Image } from "react-bootstrap";

function Banner() {
	return (
		<div className="my-2" >
			<Carousel  fade indicators={false} pause="hover" className="py-0 my-0">
				<Carousel.Item key="banner2">
					<Image
						fluid 
						src="./Banners/msi.png"
						alt="Banner 2"
						className="  h-auto w-100  py-0 my-0 rounded-0"
					/>
				</Carousel.Item>
				<Carousel.Item key="banner5">
					<Image
						fluid
						src="./Banners/iPhone-15-Banner.webp"
						alt="Banner 5"
						className=" py-0 my-0 w-100  h-auto rounded-0"
					/>
				</Carousel.Item>
				<Carousel.Item key="banner3">
					<Image
						fluid
						src="./Banners/samsung.webp"
						alt="Banner 3"
						className=" py-0 my-0 w-100  h-auto rounded-0"
					/>
				</Carousel.Item>
				<Carousel.Item key="banner3">
					<Image
						fluid
						src="./Banners/s23banner.jpg"
						alt="Banner 3"
						className=" py-0 my-0 w-100  h-auto rounded-0"
					/>
				</Carousel.Item>
			</Carousel>
		</div>
	);
}

export default Banner;
