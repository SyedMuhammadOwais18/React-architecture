import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { faCalendarDay, faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import EventContext from '../../store/event-classes/event-context';
import { useNavigate } from 'react-router-dom';

const Popup = ({ event, position }) => {
	const eventCtx = useContext(EventContext);
	let isMultiDayMultiSession = !eventCtx?.multiDayEventAsSingleEvent && !eventCtx?.multiSessionEventAsSingleEvent;
	const navigate = useNavigate();
	const renderUrl = (show, resURL) => {
		const url = new URL(resURL);
		const detailURL = url.pathname + `?eventId=${event.id}`;
		return detailURL;
	}
	const handleMouseDown = (e, url) => {
		e.stopPropagation();
		navigate(url);
	};
	return ReactDOM.createPortal(
		(

			<div className="course-cart" onMouseDown={handleMouseDown} style={{ position: 'absolute', top: position.top - 300, left: position.left + 150 }}>
				<div className="course-info-wrapper">
					<div className="cart-info-body">
						{eventCtx?.showEventNumber &&
							isMultiDayMultiSession ?
							<span className="category-color category-color-1">
								<span onMouseDown={(e) => handleMouseDown(e, renderUrl(true, event?.schedules[0]?.seatings[0].eventResURL))} className="popup-heading-sub1">{event?.num}</span>
							</span>
							:
							<span className="category-color category-color-1">
								<span onMouseDown={(e) => handleMouseDown(e, renderUrl(false, event?.eventResURL))} className="popup-heading-sub1">{event?.num}</span>
							</span>
						}
						{
							isMultiDayMultiSession ?
								<span>
									<h3 onMouseDown={(e) => handleMouseDown(e, renderUrl(false, event?.eventResURL))} className="popup-heading">{event?.name}</h3>
								</span>
								:
								<span>
									<h3 onMouseDown={(e) => handleMouseDown(e, renderUrl(false, event?.eventResURL))} className="popup-heading">{event?.name}</h3>
								</span>
						}

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
							{isMultiDayMultiSession ?
								<div onMouseDown={(e) => handleMouseDown(e, renderUrl(true, event?.schedules[0]?.seatings[0].eventResURL))} className="wishlist-btn">
									<FontAwesomeIcon icon={faInfo} />
								</div>
								:
								<div onMouseDown={(e) => handleMouseDown(e, renderUrl(false, event?.eventResURL))} className="wishlist-btn">
									<FontAwesomeIcon icon={faInfo} />
								</div>
							}
							{isMultiDayMultiSession ?
								<a className="view-details-btn cart-toggle-btn popup-register" href={renderUrl(true, event?.schedules[0]?.seatings[0].eventResURL)}>Register</a>
								:
								<a className="view-details-btn cart-toggle-btn popup-register" href={renderUrl(false, event?.eventResURL)}>Register</a>
							}
						</div>
					</div>
				</div>
			</div>
		)
		, document.body);
}

export default Popup;

