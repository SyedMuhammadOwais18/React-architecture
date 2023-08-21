import React, { useState, useContext } from 'react';
import { faClose, faDesktop, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faCalendarDay, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EventContext from "../../store/event-classes/event-context";
import { useEffect } from 'react';
import useWindowSize from '../../Hooks/useWindowSize';
let disableSearch = true;
const SearchComponent = (props) => {
	const eventCtx = useContext(EventContext);
	const portalURL = Liferay.ThemeDisplay.getPortalURL();
	const layoutURL = Liferay.ThemeDisplay.getLayoutURL();
	const [suggestions, setSuggestions] = useState([]);
	const [suggestionIndex, setSuggestionIndex] = useState(0);
	const [suggestionsActive, setSuggestionsActive] = useState(false);
	const [value, setValue] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const {width} = useWindowSize();
	const isMobile = width <= 768;

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

	const clearSearchHandler = () => {
		setSearchValue("");
		setSuggestions([]);
		props.onSearch("");
	}

	useEffect(() => {
		if (disableSearch) {
			disableSearch = false;
			return;
		}
		setSuggestions(props?.data);
		setSuggestionsActive(true);



	}, [JSON.stringify(props.data)])
	const onChangeHandler = (event) => {
		setSuggestions([]);
		setSuggestionsActive(true);
		setSearchValue(event.target.value);
		props.onSearch(event.target.value);
	}
	//so that user can click on the suggested item
	const handleClick = (resURL) => {
		setSuggestionsActive(true);
		window.location.href = `${resURL}&backURL=${layoutURL}`
	}
	const handleSubmit = (e) => {
		e.preventDefault();
	}
	const handleKeyDown = (event) => {

		setSuggestions([])
		//UP ARROW
		if (event.keyCode === 38) {
			if (suggestionIndex == 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		//DOWN ARROW
		else if (event.keyCode === 40) {
			if (suggestionIndex - 1 === suggestions?.length) {
				return;
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		//enter key
		else if (event.keyCode === 13) {

			setValue(event.target.value);
			setSuggestionIndex(0);
			setSuggestionsActive(false);


		}
	}
	const Suggestions = () => {
		if (!isMobile && suggestions?.length > 0) {
			return (
				<ul className={`autocomplete ${props.show ? 'w-218' : 'd-none'} app`}>
					{suggestions?.map((suggestion, index) => {
						return (
							<li className={`${index === suggestionIndex ? "active" : ""} item `} key={index} onClick={!eventCtx?.multiDayEventAsSingleEvent && !eventCtx?.multiSessionEventAsSingleEvent ? () => handleClick(suggestion?.schedules[0]?.seatings[0]?.eventResURL) : () => handleClick(suggestion?.eventResURL)}>
								<div className="row search-result-link m-0 pt-5 desktop-sr-hide">
									<div className="col-xl-2 col-lg-2 col-md-3">
										<div className="">
											<img src={eventCtx?.showEventImage ? (suggestion?.imgURL ? portalURL + '/' + suggestion?.imgURL : '/o/northstar-react-portlet/images/default-event-tile-image.png') : '/o/northstar-react-portlet/images/default-event-tile-image.png'} alt="" className="search-thumb" />
										</div>
									</div>
									<div className="col-md-9 checkout-item">
										<h3 className="search-result-heading">
											<a className="search-result-heading" href="#">
												{suggestion?.name}
											</a>
										</h3>
										<div className="row">
											{eventCtx?.showEventSession &&
												<div className="col-4 search-result-info">
													<>
														<span>
															<FontAwesomeIcon className="color-icon mr-5" icon={faDesktop} />
														</span>
														<span>
															{suggestion?.eventSessions > 1 ? suggestion?.eventSessions + ' Sessions' : suggestion?.eventSessions + ' Session'}
														</span>
													</>
												</div>
											}
											<div className="col-4 search-result-info">
												{eventCtx?.showEventTime && suggestion?.allDay == true &&
													<>
														<span>
															<FontAwesomeIcon className="color-icon mr-5" icon={faClock} />
														</span>
														<span className="set-time-font">{suggestion?.eventTime}</span>
													</>
												}
												{eventCtx?.showEventTime && suggestion?.allDay == false &&
													<>
														<span>
															<FontAwesomeIcon className="color-icon mr-5" icon={faClock} />
														</span>
														<span className="set-time-font">{suggestion?.eventTime?.split(',')[0]}</span>
													</>
												}
											</div>
											{eventCtx?.showEventDate &&
												<div className="col-4 search-result-info">
													<>
														<span>
															<FontAwesomeIcon className="color-icon mr-5" icon={faCalendar} />
														</span>
														<span>{suggestion?.eventDate}</span>
													</>
												</div>
											}
											{eventCtx?.showEventDay && suggestion?.eventDay &&
												<div className="col-4 search-result-info">
													<>
														<span>
															<FontAwesomeIcon className="color-icon mr-5" icon={faCalendarDay} />
														</span>
														<span>
															{suggestion?.eventDay}
														</span>
													</>
												</div>
											}
											{eventCtx?.showEventTrainer && suggestion?.schedules[0]?.seatings[0]?.activityTrainerNames?.length > 0 &&
												<div className="col-12 search-result-info">
													<>

														<span className="instructor-name">
															<a><span className='instructor__label'>Instructor:</span> <span className="instructor__name">{suggestion?.schedules[0]?.seatings[0]?.activityTrainerNames?.map(value => value?.replace(/\,/g, '')).join(' , ')}</span></a>

														</span>
													</>
												</div>
											}
											{suggestion?.price &&
												<div className="col-2 search-result-info">
													<span className="search-price">${suggestion?.price}</span>
												</div>
											}
										</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			);
		}
		else if (isMobile && suggestions?.length > 0) {
			return (

				<ul className={`autocomplete ${props.show ? 'w-218' : 'd-none'} app`}>
					{suggestions?.map((suggestion, index) => {
						return (
							<li className={index === suggestionIndex ? "active" : ""} key={index} onClick={!eventCtx?.multiDayEventAsSingleEvent && !eventCtx?.multiSessionEventAsSingleEvent ? () => handleClick(suggestion?.schedules[0]?.seatings[0]?.eventResURL) : () => handleClick(suggestion?.eventResURL)}>
								<div className='col-12  phone-sr-hide'>
									<div className='course-wrapper-2'>
										<div className='student-course-img'>
											<img src={eventCtx?.showEventImage ? (suggestion?.imgURL ? portalURL + '/' + suggestion?.imgURL : '/o/northstar-react-portlet/images/default-event-tile-image.png') : '/o/northstar-react-portlet/images/default-event-tile-image.png'} alt="" />
										</div>
										<div className='student-course-footer'>
											<div className='student-course-linkter'>
												<div className='course-Session'>
													<div className='student-course-text'>
													</div>
													<div className='row'>
														<div className='col-12'>
															<h3 className="search-card-title-phone">
																<a href="#">
																	{suggestion?.name}
																</a>
															</h3>
														</div>
														<div className="inline-rating col-6">
															<span className={`category-color events-advancelisting-eventstatus-${suggestion?.eventStatusName?.replace(/\s/g, "")}`}>
																<a href>{suggestion?.eventStatusName}</a>
															</span>
														</div>
														<div className="col-xl-6 col-lg-6 col-md-6  col-sm-6 col-6 d-flex">
															<>
																<img src="/o/northstar-react-portlet/images/default-event-reserved-icon.png" className='margin-b-t' alt="image not found" />
																<div className="w3-light-grey w3-round-large w-100">

																	<div className="w3-container w3-deep-orange w3-round-large"
																		style={{
																			width: parseFloat(totalCapacity(suggestion) * 100).toFixed(2) + '%'

																		}}
																	>

																		<div className='center-progress-text'>{parseFloat(totalCapacity(suggestion) * 100).toFixed(0) + '%'}</div></div>
																</div>
															</>
														</div>

														{eventCtx?.showEventSession &&
															<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 content-styling">
																<>
																	<span>
																		<FontAwesomeIcon className="color-icon mr-5" icon={faDesktop} />
																	</span>
																	<span>
																		{suggestion?.eventSessions > 1 ? suggestion?.eventSessions + ' Sessions' : suggestion?.eventSessions + ' Session'}
																	</span>
																</>
															</div>
														}
														{eventCtx?.showEventDay && suggestion?.eventDay &&
															<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 content-styling">
																<>
																	<span>
																		<FontAwesomeIcon className="color-icon mr-5" icon={faCalendarDay} />
																	</span>
																	<span>
																		{suggestion?.eventDay}
																	</span>
																</>
															</div>
														}
														<div className="col-xl-12 col-lg-12 col-md-12 col-sm-6 col-6 content-styling">
															{eventCtx?.showEventTime && suggestion?.allDay == true &&
																<>
																	<span>
																		<FontAwesomeIcon className="color-icon mr-5" icon={faClock} />
																	</span>
																	<span className="set-time-font">{suggestion?.eventTime}</span>
																</>
															}
															{eventCtx?.showEventTime && suggestion?.allDay == false &&
																<>
																	<span>
																		<FontAwesomeIcon className="color-icon mr-5" icon={faClock} />
																	</span>
																	<span className="set-time-font">{suggestion?.eventTime?.split(',')[0]}</span>
																</>
															}
														</div>
														{eventCtx?.showEventDate &&
															<div className="col-xl-12 col-lg-6 col-md-6 col-sm-6 col-6 content-styling">
																<>
																	<span>
																		<FontAwesomeIcon className="color-icon mr-5" icon={faCalendar} />
																	</span>
																	<span>{suggestion?.eventDate}</span>
																</>
															</div>
														}
														{eventCtx?.showEventLocation && suggestion?.loc &&
															<div className="col-12 content-styling">
																<>
																	<span>
																		<FontAwesomeIcon className='mr-5' icon={faLocationDot} />
																	</span>
																	<span>{suggestion?.loc}</span>
																</>
															</div>
														}
														{eventCtx?.showEventActivityArea && suggestion?.schedules[0]?.seatings[0]?.seatingCourt?.length > 0 &&
															<div className="col-12 content-styling">
																<>
																	<span>
																		<FontAwesomeIcon className='mr-5' icon={faLocationDot} />
																	</span>
																	<span>{suggestion?.schedules[0]?.seatings[0]?.seatingCourt?.map(value => value?.courtName?.replace(/\,/g, '')).join(' , ')}</span>
																</>
															</div>
														}

														{eventCtx?.showEventTrainer && suggestion?.schedules[0]?.seatings[0]?.activityTrainerNames?.length > 0 &&
															<div className="col-12">
																<div>
																	<span className="instructor-name">
																		<a><span className='instructor__label'>Instructor:</span> <span className="instructor__name">{suggestion?.schedules[0]?.seatings[0]?.activityTrainerNames?.map(value => value?.replace(/\,/g, '')).join(' , ')}</span></a>

																	</span>
																</div>
															</div>
														}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>


			);
		}
	};
	return (
		<div className="header-right d-flex align-items-center z-index ">
			<div className="header-search">
				{eventCtx?.showSearchOption &&
					<form onSubmit={handleSubmit}>
						<div className="bar-secrch-icon position-relative" onClick={props?.showSearchOverlayHandler} onChange={props?.showSearchOverlayHandler}>
							<input className='search-input' type="text" tabIndex={-1} value={searchValue} placeholder={eventCtx?.searchFieldPlaceHolder} onChange={onChangeHandler} onKeyDown={handleKeyDown} autoComplete="off" />
							{searchValue?.length > 0 && <FontAwesomeIcon className={(suggestions?.length > 0 && props.show) ? 'clear-search-icon-searchresult' : 'clear-search-icon'} icon={faClose} onClick={clearSearchHandler} />}
							<FontAwesomeIcon className='search-icon-style' icon={faMagnifyingGlass} />
							{suggestionsActive && suggestions?.length > 0 && <Suggestions />}

						</div>
					</form>
				}
			</div>
		</div>
	)
}
export default React.memo(SearchComponent);
