import React from "react";
import { faStar, faUserFriends, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const InstructorDetailComponent = (props) => {
	return (
		<div className="course-instructors">
			<h3>{props.heading}</h3>
			<div className="instructors-heading">
				<div className="instructors-img w-img">
					<a href="#">
						<img src={props.image} alt="image not found" />
					</a>
				</div>
				<div className="instructors-body">
					<h5> <a href="#">{props.name}</a> </h5>
					<span className="instructor-profession">{props.profession}</span>
					<div className="intructors-review">
						<FontAwesomeIcon icon={faStar} className="instructor-icon" />
						<span className="instructor-review">{props.rating}</span>
					</div>
					<div className="instructors-footer">
						<FontAwesomeIcon icon={faDesktop} className="mr-5" />
						<span className="courses">{props.courses} Courses</span>
						<FontAwesomeIcon icon={faUserFriends} className="mr-5" />
						<span className="students">{props.students} Students</span>
					</div>
				</div>
			</div>
			<div className="intructors-content">
				<p>
					{props.instructorIntro}
				</p>
			</div>
		</div>
	)
}
export default InstructorDetailComponent;