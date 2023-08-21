import React from "react";
const OverlayComponent = (props) => {
	return (
		<div className="overlay" id="overlay" style={{ display: props.show == true ? 'block' : 'none' }}>
		</div>
	)
}
export default OverlayComponent;