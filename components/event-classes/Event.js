import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faCalendarDay, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EventContext from "../../store/event-classes/event-context";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Popup from './Popup';
import { totalCapacity } from '../../Utility/event-classes/functions/AppendCounts';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../Hooks/useWindowSize';

const Event = ({ event, selectClass, index, selectedEvent, setSelectedEvent }) => {
	const portalURL = Liferay.ThemeDisplay.getPortalURL();
	const layoutURL = Liferay.ThemeDisplay.getLayoutURL();
	const eventCtx = useContext(EventContext);
	let eventResURL = eventCtx?.eventReservationURL;
	if (eventResURL === "") {
		eventResURL = "/group/pages/events-reservation";
	}
	const parentRef = useRef(null);
	const { width } = useWindowSize();
	const navigate = useNavigate();
	const isMobile = width <= 768;
	const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (parentRef.current && !parentRef.current.contains(event.target)) {
				setSelectedEvent(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const showPopup = () => {
		setSelectedEvent(index);
		if (parentRef.current) {
			const rect = parentRef.current.getBoundingClientRect();
			setPopupPosition({
				top: rect.top + window.scrollY + rect.height,
				left: rect.left + window.scrollX
			});
		}
	}
	const handleRedirection = (resURL) => {
		const url = new URL(resURL);
		const detailURL = url.pathname + `?eventId=${event.id}`;
		return detailURL;

	}
	const handleClick = () => {
		if (!isMobile) {
			showPopup();
		}
		else if (!eventCtx?.multiDayEventAsSingleEvent && !eventCtx?.multiSessionEventAsSingleEvent) {
			const redirectURL = handleRedirection(event?.schedules[0]?.seatings[0].eventResURL);
			navigate(redirectURL);
		}
		else {
			const redirectURL = handleRedirection(event?.eventResURL);
			navigate(redirectURL);
		}
	}

	return (
		<>

			<div className="course-wrapper-2 mb-15" ref={parentRef} onClick={handleClick}>
				<div className="student-course-img">
					<img className="image-transition" src={eventCtx?.showEventImage ? (event.imgURL ? portalURL + '/' + event.imgURL : '/o/northstar-react-portlet/images/default-event-tile-image.png') : '/o/northstar-react-portlet/images/default-event-tile-image.png'} alt="" />
					<div className="round" id="c1cb" style={{ display: selectClass ? '' : 'none' }} >
						<FormControlLabel
							control={
								<Checkbox
									className="card-checkbox"
									color="primary"
								/>
							}
						/>
					</div>
				</div>
				{selectedEvent == index && !isMobile &&
					<Popup event={event} position={popupPosition} />
				}
				<div className="student-course-footer">
					<div className="student-course-linkter">
						<div className="course-Session">
							<div className="student-course-text"> </div>
							<div className="row">
								<div className="col-12">
									<h3 className="remove-extra-space"><span className="student-course-footer-anchor">{event.name}</span></h3> </div>
								<div className="inline-rating col-6">
									<span className={`category-color events-advancelisting-eventstatus-${event?.eventStatusName?.replace(/\s/g, "")}`}>
										<span>{event?.eventStatusName}</span>
									</span>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6 d-flex">
									<>
										<img src="/o/northstar-react-portlet/images/default-event-reserved-icon.png" className='margin-b-t' alt="image not found" />
										<div className="w3-light-grey w3-round-large w-100">

											<div className="w3-container w3-deep-orange w3-round-large"
												style={{
													width: parseFloat(totalCapacity(event) * 100).toFixed(2) + '%'

												}}
											>

												<div className='center-progress-text'>{parseFloat(totalCapacity(event) * 100).toFixed(0) + '%'}</div></div>
										</div>
									</>
								</div>
								{eventCtx?.showEventSession &&
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6  col-6 content-styling">
										<>
											<span>
												<FontAwesomeIcon className='mr-5' icon={faDesktop} />
											</span>
											<span>
												{event?.eventSessions} Sessions
											</span>
										</>
									</div>
								}
								{eventCtx?.showEventDay && event?.eventDay &&
									<div className="col-xl-6 col-lg-6 col-md-6  col-sm-6  col-6 content-styling">
										<>
											<span>
												<FontAwesomeIcon className='mr-5' icon={faCalendarDay} />
											</span>
											<span>
												{event?.eventDay}
											</span>
										</>
									</div>
								}
								{eventCtx?.showEventTime && event?.allDay == false && event?.eventTime.split(',').length > 1 ?
									<div className="col-xl-12 col-lg-12 col-md-12  col-sm-12  col-12 content-styling">
										<span>
											<FontAwesomeIcon className='mr-5' icon={faClock} />
										</span>
										<span className="set-time-font">{event?.eventTime}</span>
									</div>
									:
									<div className="col-xl-6 col-lg-6 col-md-6  col-sm-6  col-6 content-styling">
										<span>
											<FontAwesomeIcon className='mr-5' icon={faClock} />
										</span>
										<span className="set-time-font">{event?.eventTime}</span>
									</div>

								}

								{eventCtx?.showEventDate &&
									<div className="col-xl-6 col-lg-6 col-md-6  col-sm-6  col-6 content-styling">
										<>
											<span>
												<FontAwesomeIcon className='mr-5' icon={faCalendar} />
											</span>
											<span>{event?.eventDate}</span>
										</>
									</div>
								}
								{eventCtx?.showEventLocation && event?.loc &&
									<div className="col-xl-12 col-lg-12 col-md-12  col-sm-12 col-12 content-styling">
										<>
											<span>
												<FontAwesomeIcon className='mr-5' icon={faLocationDot} />
											</span>
											<span>{event?.loc}</span>
										</>
									</div>
								}



								{!isMobile && eventCtx?.showEventActivityArea && event?.schedules[0]?.seatings[0]?.seatingCourt?.length > 0 &&
									<div className="col-xl-12 col-lg-12 col-md-12  col-sm-12 col-12 content-styling">
										<>
											<span>
												<FontAwesomeIcon className='mr-5' icon={faLocationDot} />
											</span>
											<span>{event?.schedules[0]?.seatings[0]?.seatingCourt?.length > 1 && event?.schedules[0]?.seatings[0]?.seatingCourt[0].courtName} {event?.schedules[0]?.seatings[0]?.seatingCourt?.length > 1 ?
												<Tooltip className='instructor-styling' title={event?.schedules[0]?.seatings[0]?.seatingCourt?.slice(1).map(value => value?.courtName?.replace(/\,/g, '')).join(' , ')} aria-label="add">
													<Fab color="primary" className='col-white'>
														{event?.schedules[0]?.seatings[0]?.seatingCourt?.slice(1).length}
													</Fab>
												</Tooltip> : event?.schedules[0]?.seatings[0]?.seatingCourt[0].courtName}</span>
										</>
									</div>
								}


								{isMobile && eventCtx?.showEventActivityArea && event?.schedules[0]?.seatings[0]?.seatingCourt?.length > 0 &&
									<div className="col-xl-12 col-lg-12 col-md-12  col-sm-12 col-12 content-styling">
										<>
											<span>
												<FontAwesomeIcon className='mr-5' icon={faLocationDot} />
											</span>
											<span>{event?.schedules[0]?.seatings[0]?.seatingCourt?.map(value => value?.courtName?.replace(/\,/g, '')).join(' , ')}</span>
										</>
									</div>
								}


								<div className='bt52'>
									{!isMobile && eventCtx?.showEventTrainer && event?.schedules[0]?.seatings[0]?.activityTrainerNames?.length > 0 &&
										<div className="col-xl-12 col-lg-12 col-md-6  col-sm-12 col-12">
											<div className="user-icon">
												<span className="instructor-name">
													<>
														<a >
															Instructor: {event?.schedules[0]?.seatings[0]?.activityTrainerNames?.length > 1 && event?.schedules[0]?.seatings[0]?.activityTrainerNames[0]} {event?.schedules[0]?.seatings[0]?.activityTrainerNames?.length > 1 ?
																<Tooltip className='instructor-styling' title={event?.schedules[0]?.seatings[0]?.activityTrainerNames?.slice(1).map(value => value?.replace(/\,/g, '')).join(' , ')} aria-label="add">
																	<Fab color="primary" className='col-white'>
																		{event?.schedules[0]?.seatings[0]?.activityTrainerNames?.slice(1).length}
																	</Fab>
																</Tooltip> : event?.schedules[0]?.seatings[0]?.activityTrainerNames}
														</a>

													</>
												</span>
											</div>
										</div>
									}
									{isMobile && eventCtx?.showEventTrainer && event?.schedules[0]?.seatings[0].activityTrainerNames?.length > 0 &&
										<>
											<div className="col-12">
												<div>
													<span className="instructor-name">
														<>
															<a>
																<span className='instructor__label'>Instructor:</span> <span className="instructor__name">{event?.schedules[0]?.seatings[0]?.activityTrainerNames?.map(value => value?.replace(/\,/g, '')).join(' , ')}</span>
															</a>
														</>
													</span>
												</div>
											</div>
										</>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
}
export default (Event);
