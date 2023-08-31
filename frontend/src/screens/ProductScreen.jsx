import React, { useRef, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styles from "../styles.module.css";

import { Row, Col, Image, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useLocation, Link } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const Page = ({ offset, gradient, onClick }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { error, loading, products, page, pages } = productList;

	let keyword = location.search;

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);

	return (
		<>
			<ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
				<div className={styles.slopeBegin} />
			</ParallaxLayer>

			<ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
				<div className={`${styles.slopeEnd} ${styles[gradient]}`} />
			</ParallaxLayer>

			<ParallaxLayer offset={offset} speed={0.3}>
				{offset === 0 && (
					<Container>
						{loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger">{error}</Message>
						) : (
							<Row>
								{products.slice(0, 4).map((product) => (
									<Col
										id="card"
										className=" my-2  "
										key={product._id}
										lg
										md
										sm
										xs>
										<Link id="product_name" to={`/product/${product._id}`}>
											<Container className="border h-100  bg-gradient rounded-3">
												<Image
													className=" rounded-3 "
													src={product.image}
													alt={product.name}
													fluid
												/>
												<h6 style={{ color: "whitesmoke" }}>{product.name}</h6>
												<h6 className="text-light ">{product.price} (Birr)</h6>
											</Container>
										</Link>
									</Col>
								))}
							</Row>
						)}
						<Paginate page={page} pages={pages} keyword={keyword} />
					</Container>
				)}

				{offset === 1 && (
					<Container>
						{loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger">{error}</Message>
						) : (
							<Row>
								{products.slice(4, 8).map((product) => (
									<Col className=" my-2  " key={product._id} lg md sm xs>
										<Link id="product_name" to={`/product/${product._id}`}>
											<Container className="border h-100  bg-gradient rounded-3">
												<Image
													className=" rounded-3 "
													src={product.image}
													alt={product.name}
													fluid
												/>
												<h6 style={{ color: "whitesmoke" }}>{product.name}</h6>
												<h6 className="text-light ">{product.price} (Birr)</h6>
											</Container>
										</Link>
									</Col>
								))}
								<Paginate page={page} pages={pages} keyword={keyword} />
							</Row>
						)}
					</Container>
				)}
			</ParallaxLayer>
		</>
	);
};

export default function ProductScreen() {
	const parallax = useRef(null);

	const scroll = (to) => {
		if (parallax.current) {
			parallax.current.scrollTo(to);
		}
	};

	return (
		<div style={{ background: "#dfdfdf" }}>
			<Parallax className={styles.container} ref={parallax} pages={2} vertical>
				<Page offset={0} gradient="pink" onClick={() => scroll(1)} />
				<Page offset={1} gradient="teal" onClick={() => scroll(0)} />
				<Page offset={2} gradient="tomato" onClick={() => scroll(0)} />
			</Parallax>
		</div>
	);
}
