import React from 'react';
import CustomHeading from "../../../common/CustomHeading";
import EventDetailCard from "./EventDetailCard";
import EventParticulars from "./EventParticulars";
import EventPublishPage from "./EventPublishPage";
import EventMembers from "./EventMembers";
import InstructorsList from '../InstructorsList';
const EventDetails = ({ eventDetail, members, isMobile,instructors, membersData, onSetMembersData, url }) => {
    return (
		<section className="course-detalis-area">
			<div className="container">
				<div className="row">
					<div className=" col-xxl-8 col-xl-8">
						<div className="course-detalis-wrapper mb-30">
							<CustomHeading className="course-heading mb-20" level={2}>{eventDetail?.name}</CustomHeading>											
							<EventParticulars event={eventDetail} />
							<EventPublishPage event={eventDetail} />
							<EventMembers members={members} onSetMembersData={onSetMembersData} />
							{instructors?.length > 0 && <InstructorsList instructors={instructors} />}
						</div>
					</div>
					<div className="col-xxl-4 col-xl-4 col-lg-8 col-md-8">
						{ !isMobile && <EventDetailCard event={eventDetail} membersData={membersData} url={url} /> }
					</div>
				</div>
			</div>
		</section>
	);
}

export default EventDetails;