import React from "react";
const RegisterScreenHeaderComponent = (props) => {
	return (
		<div className={props.member ? "confirmation-card-header" : "confirmation-card-header-wr"}>
			<div className="row">
				<div className="col-12">
					<div className="testimonial-header">
						<div className="testimonial-img">
							<img src={props.imageUrl} alt="image not found" />
						</div>
						<div className="testimonial-title">
							<h4>{props.name}</h4>
							<span>{props.identification}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default RegisterScreenHeaderComponent;