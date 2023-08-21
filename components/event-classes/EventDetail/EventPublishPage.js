import React from 'react';
const EventPublishPage = ({ event }) => {
    return (
	<>
		{event?.publishSchedule?.publishContent &&
			<div className="course-description pt-45 pb-30">
				<div
					dangerouslySetInnerHTML={{ __html: event?.publishSchedule?.publishContent }}
				/>
			</div>
		}
	</>);
}

export default EventPublishPage;