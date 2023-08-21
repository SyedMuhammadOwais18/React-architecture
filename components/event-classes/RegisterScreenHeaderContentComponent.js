import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import "./css/CardComponent.css";
import { faClock, faCalendarAlt, faMapMarkerAlt, faCalendarDay, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
const RegisterScreenHeaderContentComponent = (props) => {
	return (
		<div className="single-item single-item-wr ">
			<div className="event_info">
				<h3 className="register-screen-content">
					<a href="#">Jazz Expert</a>
				</h3>
				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-6  margin-top-10">
						<div className="row">
							<div className="col-xl-2 col-lg-2 col-md-6">
								<span>
									<FontAwesomeIcon icon={faClock} className="register-screen-icon-styling" />
									9:00 AM to 4:20 PM
								</span>
							</div>
							<div className="col-xl-2 col-lg-2 col-md-6">
								<span>
									<FontAwesomeIcon icon={faCalendarAlt} className="register-screen-icon-styling" />
									15 May to 15 June
								</span>
							</div>
							<div className="col-xl-2 col-lg-2 col-md-6 col-sm-6  col-6">
								<img src="/o/northstar-react-portlet/images/default-event-reserved-icon.png" alt="image not found" />
								<div className="w3-light-grey w3-round-large">
									<div className="w3-container w3-deep-orange w3-round-large w-80" >
										80%
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-2 col-md-6  col-sm-6 col-6">
								<span>
									<FontAwesomeIcon icon={faMapMarkerAlt} className="register-screen-icon-styling" />
									Studio
								</span>
							</div>
							<div className="col-xl-2 col-lg-2 col-md-6  col-sm-6  col-6">
								<span>
									<FontAwesomeIcon icon={faCalendarDay} className="register-screen-icon-styling" />
									M W F
								</span>
							</div>
							<div className="col-xl-2 col-lg-2 col-md-6 amount-chk">
								<span>
									$12.00
									<FontAwesomeIcon icon={faEdit} className="fa-pen-to-square" />
									<FontAwesomeIcon icon={faTrashAlt} className="fa-trash-can" />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="row  notification display-block">
					<div className="col-12">
						<span className="btn btn-success">Register</span>
					</div>
				</div>
			</div>
		</div>
	)
}
export default RegisterScreenHeaderContentComponent;