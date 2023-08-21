import React from 'react';
const DisplayResultComponent = (props) => {
	return (
		<div className="course-sidebar-tab">
			<div className="course-sidebar-wrapper">
				<div className="curse-tab-left-wrap">
					<div className="course-results">
						<span>Showing</span>
						<span className="course-result-showing">{props.filterData}</span>
						<span className="mrl-2">of</span>
						<span className="course-result-number">{props.totalData}</span>
						<span className="mrl-2">results</span>
					</div>
				</div>
			</div>
		</div>
	)
}
export default React.memo(DisplayResultComponent);