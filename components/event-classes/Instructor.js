import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {faUserFriends,faDesktop } from '@fortawesome/free-solid-svg-icons';
import CustomHeading from "../../common/CustomHeading";

const Instructor = ({ instructor, eventCounts, reservationCounts }) => {
	const [instructorEventsCount, setInstructorEventsCount] = useState(0);
	const [reservationEventsCount, setReservationEventsCount] = useState(0);
	
	useEffect(() => {
		const instructorCounts = getInstructorCount();
		setInstructorEventsCount(instructorCounts);
	},[])
	
	useEffect(() => {
		const reservationCounts = getReservationCount();
		setReservationEventsCount(reservationCounts);
	},[])
	
	const getInstructorCount = () => {
		const instructorCount = eventCounts?.find(
			(eventCount) => eventCount.employeeId === instructor.employeeId
	  	);
	
	  	if (instructorCount) {
	    	return instructorCount.countsMap.EventsCount;
	  	}
	  	return 0;
	};
	
	const getReservationCount = () => {
		const instructorReservationCount = reservationCounts?.find(
			(reservationCount) => reservationCount.employeeId === instructor.employeeId
	  	);
	
	  	if (instructorReservationCount) {
	    	return instructorReservationCount.countsMap.ReservationsCount;
	  	}
	  	return 0;
	};
	
    return (<div className="course-instructors">
        <div className="instructors-heading">
            <div className="instructors-img w-img">
                <a href="#">
                    <img src={"/o/northstar-react-portlet/images/default-instructor-image.png"} alt="image not found" />
                </a>
            </div>
            <div className="instructors-body">
                <CustomHeading level={5}>{instructor?.employeeName}</CustomHeading>
                <span className="instructor-profession">{instructor?.employeeSpeciality}</span>
                <div className="instructors-footer">
                    <FontAwesomeIcon icon={faDesktop} style={{ marginRight: "5px" }} />
                    <span className="courses">{instructorEventsCount} Courses</span>
                    <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: "5px" }} />
                    <span className="students">{reservationEventsCount} Students</span>
                </div>

            </div>
        </div>
        <div className="intructors-content">
            <p>
                {instructor?.employeeComment}
            </p>
        </div>
    </div>);
}

export default Instructor;