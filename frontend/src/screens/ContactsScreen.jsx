import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styles from "../styles.module.css";
import { Container, Col, Row } from "react-bootstrap";

const Page = ({ offset, gradient, onClick }) => (
	<>
		<ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
			<div className={styles.slopeBegin} />
		</ParallaxLayer>

		<ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
			<div className={`${styles.slopeEnd} ${styles[gradient]}`} />
		</ParallaxLayer>

		<ParallaxLayer
			className={`${styles.text} ${styles.number}`}
			offset={offset}
			speed={0.3}>
			{offset == 0 && (
				<Container
					style={{
						top: "-5rem",
						position: "relative"
					}}>
					<Col xl={6}>
						<h1 style={{ fontSize: 40 }} className=" text-light text-center   ">
							Large Assortment
						</h1>
						<h6
							style={{ fontSize: 20 }}
							className="text-light opacity-75 text-center py-2  text-capitalize ">
							We offer many different types of products with fewer variations in
							each category.
						</h6>
					</Col>
				</Container>
			)}
			{offset == 1 && (
				<Container
					style={{
						top: "-5rem",
						position: "relative"
					}}>
					<Col xl={6}>
						<h1 style={{ fontSize: 50 }} className=" text-light text-center   ">
							Fast & Secure Shipping
						</h1>
						<h6
							style={{ fontSize: 20 }}
							className="text-light opacity-75 text-center py-2  text-capitalize ">
							2-day or less delivery time, free shipping and an expedited
							delivery option.
						</h6>
					</Col>
				</Container>
			)}
			{offset == 2 && (
				<Container
					style={{
						top: "-5rem",
						position: "relative"
					}}>
					<Col xl={6}>
						<h1 style={{ fontSize: 50 }} className=" text-light text-center   ">
							24/7 Support
						</h1>
						<h6
							style={{ fontSize: 20 }}
							className="text-light opacity-75 text-center py-2  text-capitalize ">
							we offer many deffernet types of products with fewer variations in
							each category.
						</h6>
					</Col>
				</Container>
			)}
		</ParallaxLayer>
	</>
);

export default function ContactsScreen() {
	const parallax = useRef(null);

	const scroll = (to) => {
		if (parallax.current) {
			parallax.current.scrollTo(to);
		}
	};

	return (
		<div style={{ background: "#dfdfdf" }}>
			<Parallax
				className={styles.container}
				ref={parallax}
				pages={3}
				horizontal>
				<Page offset={0} gradient="pink" onClick={() => scroll(1)} />
				<Page offset={1} gradient="teal" onClick={() => scroll(2)} />
				<Page offset={2} gradient="tomato" onClick={() => scroll(0)} />
			</Parallax>
		</div>
	);
}
