import React from "react";
import RegisterScreenHeaderComponent from "./RegisterScreenHeaderComponent";
import RegisterScreenHeaderContentComponent from "./RegisterScreenHeaderContentComponent";
const RegisterScreenMemberComponent = (props) => {
	return (
		<div className="col-xl-12 col-lg-12 col-md-6 ">
			<div className="academic-box confirmation-card">
				<RegisterScreenHeaderComponent member={props.member} name={props.name} identification={props.identification} imageUrl={props.imageUrl} />
				<RegisterScreenHeaderContentComponent />
			</div>
		</div>
	)
}
export default React.memo(RegisterScreenMemberComponent);