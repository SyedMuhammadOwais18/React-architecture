import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faCalendarDay, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EventContext from "../../store/event-classes/event-context";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
const CardComponent = ({ event, selectClass, index }) => {
	const portalURL = Liferay.ThemeDisplay.getPortalURL();
	const layoutURL = Liferay.ThemeDisplay.getLayoutURL();
	const eventCtx = useContext(EventContext);
	const wrapperRef = useRef(null);
	const checkIsDesktop = window.matchMedia('(min-width:1000px) and (max-width: 4000px)');
	const [open, setOpen] = useState(null);
	//useEffect to detect click outside div
	useEffect(() => {

		const handleClickOutside = (event) => {

			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setOpen(null);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);
	const showPopup = (index) => {

		if (open == index) {


			setOpen(null);
		}
		else {
			setOpen(index);
		}
	}

	const handleRedirection = (resURL) => {

		window.location.href = `${resURL}&backURL=${layoutURL}`;
	}
	const renderUrl = (show, resURL) => {
		if (show) {
			return `${resURL}&backURL=${layoutURL}`;
		} else {
			return `${resURL}&backURL=${layoutURL}`
		}
	}

	const totalCapacity = (event) => {
		const capacity = event.schedules.map((s) => (
			{
				totalReserved: s.seatings.reduce(function (sum, ele) {
					return sum + ele.reserved + ele.available;
				}, 0)
			}
		))
		const sumCapacity = capacity.reduce((accumulator, object) => {
			return accumulator + object.totalReserved;
		}, 0);

		const reserved = event.schedules.map((s) => (
			{
				totalReserved: s.seatings.reduce(function (sum, ele) {
					return sum + ele.reserved;
				}, 0)
			}
		))
		const sumReserved = reserved.reduce((accumulator, object) => {
			return accumulator + object.totalReserved;
		}, 0);
		const totalCapacity = sumReserved / sumCapacity
		return parseFloat(totalCapacity).toFixed(2);

	}

	return (
		<>

			<div className="course-wrapper-2 mb-15" onClick={checkIsDesktop.matches ? () => showPopup(index) : !eventCtx?.multiDayEventAsSingleEvent && !eventCtx?.multiSessionEventAsSingleEvent ? () => handleRedirection(event?.schedules[0]?.seatings[0].eventResURL) : () => handleRedirection(event?.eventResURL)}>
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
				{open == index && checkIsDesktop.matches &&
					<div className="course-cart" ref={wrapperRef}>
						<div className="course-info-wrapper">
							<div className="cart-info-body">
								<span className="category-color category-color-1">
									<a href="true">{eventCtx?.showEventNumber && event?.num}</a>
								</span>
								<a href="true">
									<h3>{event?.name}</h3>
								</a>
								<div className="cart-lavel">
									<p>{eventCtx?.showEventDescription && event?.desc?.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ')}</p>
								</div>
								<div className="info-cart-text">
									<ul>
										{eventCtx?.showEventDay && event?.eventDay &&
											<li>
												<span className="check-icon">
													<FontAwesomeIcon icon={faCheck} />
												</span>
												<span>
													<>
														<span>
															<FontAwesomeIcon className='mr-5' icon={faCalendarDay} />
														</span>
														<span>
															{event?.eventDay}
														</span>
													</>
												</span>
											</li>
										}
									</ul>
								</div>
								<div className="course-action">

									{!eventCtx?.multiDayEventAsSingleEvent && !eventCtx?.multiSessionEventAsSingleEvent ?
										<a className="view-details-btn cart-toggle-btn" href={renderUrl(true, event?.schedules[0]?.seatings[0].eventResURL)}>Register</a>
										:
										<a className="view-details-btn cart-toggle-btn" href={renderUrl(false, event?.eventResURL)}>Register</a>
									}
								</div>
							</div>
						</div>
					</div>
				}
				<div className="student-course-footer">
					<div className="student-course-linkter">
						<div className="course-Session">
							<div className="student-course-text"> </div>
							<div className="row">
								<div className="col-12">
									<h3 className="remove-extra-space"><a className="student-course-footer-anchor" href="true">{event.name}</a></h3> </div>
								<div className="inline-rating col-6">
									<span className={`category-color events-advancelisting-eventstatus-${event?.eventStatusName?.replace(/\s/g, "")}`}>
										<a href="true">{event?.eventStatusName}</a>
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



								{checkIsDesktop.matches && eventCtx?.showEventActivityArea && event?.schedules[0]?.seatings[0]?.seatingCourt?.length > 0 &&
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


								{!checkIsDesktop.matches && eventCtx?.showEventActivityArea && event?.schedules[0]?.seatings[0]?.seatingCourt?.length > 0 &&
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
									{checkIsDesktop.matches && eventCtx?.showEventTrainer && event?.schedules[0]?.seatings[0]?.activityTrainerNames?.length > 0 &&
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
									{!checkIsDesktop.matches && eventCtx?.showEventTrainer && event?.schedules[0]?.seatings[0].activityTrainerNames?.length > 0 &&
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
export default (CardComponent);
