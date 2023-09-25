// eslint-disable-next-line react/prop-types
function Rating({ value, text, color }) {
	return (
		<div>
			<div className=" rounded rating">
				<span>
					<i
						style={{ color }}
						className={
							value >= 1
								? "fas fa-star"
								: value >= 0.5
								? "fas fa-star-half-alt"
								: "far fa-star"
						}></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 2
								? "fas fa-star"
								: value >= 1.5
								? "fas fa-star-half-alt"
								: "far fa-star"
						}></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 3
								? "fas fa-star"
								: value >= 2.5
								? "fas fa-star-half-alt"
								: "far fa-star"
						}></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 4
								? "fas fa-star"
								: value >= 3.5
								? "fas fa-star-half-alt"
								: "far fa-star"
						}></i>
				</span>

				<span>
					<i
						style={{ color }}
						className={
							value >= 5
								? "fas fa-star"
								: value >= 4.5
								? "fas fa-star-half-alt"
								: "far fa-star"
						}></i>
				</span>
				<span className=" text-black-50 rounded ">{text && text}</span>
			</div>
		</div>
	);
}

export default Rating;
