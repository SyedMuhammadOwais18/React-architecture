import React from "react";
const ProgressBarComponent = (props) => {
	return (
		<>
			<div className="progress">
				<div className="progress-bar wow fadeInLeft" role="progressbar" style={{ width: props.totalRating, animationName: "fadeInLeft" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" data-wow-duration="1s" data-wow-delay="0.5s">
				</div>
			</div>
			<div className="progress-tittle">
				<span> {props.totalRating} </span>
			</div>
		</>
	)
}
export default React.memo(ProgressBarComponent);