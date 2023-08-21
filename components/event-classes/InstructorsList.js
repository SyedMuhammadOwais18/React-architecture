import Instructor from "./Instructor";
import React, { useEffect, useState, useContext } from 'react';
import CustomHeading from "../../common/CustomHeading";
import useHttp from "../../Hooks/useHttp";
import EventContext from "../../store/event-classes/event-context";
import day from 'dayjs';
import { useSelector } from "react-redux";

const InstructorsList = ({ instructors }) => {

	const properties = useSelector(state => state.properties.eventPortalDetailCatalogLabels);
	const eventCtx = useContext(EventContext);
	const startDate = day().format('YYYY-MM-DD').toString();
	const endDate = parseInt(eventCtx?.showEventsForNumberOfDays) > 0 ? day().add(parseInt(eventCtx?.showEventsForNumberOfDays) - 1, 'day').format('YYYY-MM-DD').toString() : null;
	const [instructorsIds, setInstructorsIds] = useState([]);
	const [eventsCount, setEventsCount] = useState(null);
	const [reservationCounts, setReservationCounts] = useState(null);
	const plId = Liferay.ThemeDisplay.getPlid();
	const { sendRequest } = useHttp();

	let body = {
		"trainerIds": instructorsIds
	  };
	  if(startDate !== null){
		body["fromDate"] = startDate;
	  }
	  
	  if (endDate !== null) {
		body["toDate"] = endDate;
	  }
	
	const getEventCountResponse = (response) => {
		setEventsCount(response.response)
	}
	
	const getReservationResponse = (response) => {
		setReservationCounts(response.response);
	}
	
	useEffect(() => {
		const ids = instructors.map((item) => item.employeeId);
		setInstructorsIds(ids);
	},[])
	
	useEffect(() => {
		if(instructorsIds.length > 0){
			sendRequest({
				url: '/northstar-react.classesview/search-instructors-event-counts',
				body:body,
				plId: plId,
				method:'POST'
	
			}, getEventCountResponse)
		}
	}, [instructorsIds])
	
	useEffect(() => {
		if(instructorsIds.length > 0){
			sendRequest({
				url: '/northstar-react.classesview/search-instructors-reservation-counts',
				body:body,
				plId: plId,
				method:'POST'
	
			}, getReservationResponse)
		}
	}, [instructorsIds])
        return (
            eventsCount != null && reservationCounts != null && <> 
				<CustomHeading level={2}>{properties?.instructorsHeading}</CustomHeading>
                {instructors?.map((instructor) => (

                    <Instructor instructor={instructor} key={instructor.employeeId} eventCounts={eventsCount} reservationCounts={reservationCounts}/>

                ))}
            </>
        );
    
}

export default InstructorsList;