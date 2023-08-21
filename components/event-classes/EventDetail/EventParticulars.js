import React from 'react';
import { useSelector } from 'react-redux';
import { formatCommaSeperatedList, totalEnrolled } from "../../../Utility/event-classes/functions/AppendCounts";
const EventParticulars = ({ event }) => {
	const properties = useSelector(state => state.properties.eventPortalDetailCatalogLabels);
	return (
		<div className="course-detelis-meta">
			<div className="course-meta-wrapper border-line-meta">
				<div className="course-meta-img">
					<a href="#">
						<img src="/o/northstar-react-portlet/images/default-created-by-icon.png" alt="Created By" />
					</a>


				</div>
				<div className="course-meta-text">
					<span>{properties?.createdByLabel}</span>
					<h6 className="detail-instructor-name">
						<a href="#">{event?.coName}</a>
					</h6>
				</div>
			</div>
			<div className="course-Enroll border-line-meta">
				<p>{properties?.totalEnrolledLabel}</p>
				<span>{totalEnrolled(event)}</span>
			</div>
			<div className="course-update border-line-meta">
				<p>{properties?.fromDateSessionsLabel}</p>
				<span>{event?.date} ({event?.eventSessions} sessions) </span>
			</div>
			<div className="course-category">
				<p>{properties?.forCategoriesFiltersLabel}</p>
				<span><a href="#">{formatCommaSeperatedList(event?.filterNames)}</a></span>
			</div>
		</div>
	);
}

export default EventParticulars;