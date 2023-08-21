import React from "react";
const RegisterScreenCardComponent = (props) => {
	return (
		<div className="blog-wrapper position-relative mb-30">
			<div className="blog-thumb ">
				<a href="#">
					<img src="/o/northstar-react-portlet/images/default-register-screen-event-types-image.png" alt="blog-img" />
				</a>
			</div>
			<div className="blog-content-wrapper">
				<div className="blog-content">
					<a className="card-hover-styling" href="#">
						<h3>
							Hip Hop Intermediate Expert
						</h3>
					</a>
					<a className="blog-btn" href="#">
						Read more
					</a>
				</div>
			</div>
		</div>
	);
}
export default React.memo(RegisterScreenCardComponent);