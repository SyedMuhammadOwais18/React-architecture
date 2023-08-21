import React, { useState } from "react";
import DrawerComponent from "./../../components/event-classes/DrawerComponent";
import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import EventContext from "../../store/event-classes/event-context";
import useHttp from "../../Hooks/useHttp";
import { eventDetailActions, filterActions, memberActions, propertiesActions } from "../../redux-store/index.js";
import { useDispatch, useSelector } from "react-redux";
import day from 'dayjs';
import EventDetails from "../../components/event-classes/EventDetail/EventDetails";
import LoaderComponent from "../../components/event-classes/LoaderComponent";
import useWindowSize from "../../Hooks/useWindowSize";
import TabButtons from "../../components/event-classes/EventDetail/TabButtons";
import TabContent from "../../components/event-classes/EventDetail/TabContent";
import fetchData from "../../connection/ApiRequest.js";
import CustomAlert from "../../components/event-classes/CustomAlert";
import { useRef } from "react";
import Badge from '@material-ui/core/Badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const DetailScreen = (props) => {
	const eventCtx = useContext(EventContext);
	const properties = useSelector(state => state.properties.eventPortalDetailCatalogLabels);
	const layoutURL = Liferay.ThemeDisplay.getLayoutURL();
	const { loading, error, sendRequest } = useHttp();
	const { width } = useWindowSize();
	const isMobile = width <= 768;
	const navigate = useNavigate();
	const eventDetail = useSelector((state) => state.eventDetails.event);
	const eventInstructors = useSelector((state) => state.eventFilters.filterData.Instructors);
	const plId = Liferay.ThemeDisplay.getPlid();
	const isAdmin = props.isAdmin;
	const [instructors, setInstructors] = useState([]);
	const [members, setMembers] = useState([]);
	const [activeTab, setActiveTab] = useState('tab1');
	const [membersData, setMembersData] = useState([]);
	const wrapperRef = useRef();

	const onSetMembersData = (ids) => {
		console.log("Ids : ",ids);
		console.log("Members Data : ",membersData);
		if (ids) {
			setMembersData(ids);
		}
	};

	const switchTab = (tabId) => {
		setActiveTab(tabId);
	};
	const [drawer, setDrawer] = useState(false);
	const showOverlay = false;

	//for fetching css class on click on close button
	//data passing from child to parent
	const onGetCloseClassHandler = (currentState) => {
		setDrawer(!currentState);
	}

	const dispatch = useDispatch();
	const memberId = parseInt(Liferay.ThemeDisplay.getNsMemberId());
	const wholeSchedule = eventCtx?.multiDayEventAsSingleEvent && eventCtx?.view == 1;

	const portalURL = Liferay.ThemeDisplay.getPortalURL();
	const authToken = '?p_auth=' + Liferay.authToken;
	const getDependentMembers = `${portalURL}/api/jsonws/northstar-react.classesview/get-dependent-members/member-id/${memberId}/${authToken}`;


	const eventParam = {
		memberId: memberId,
		view: eventCtx?.view,
		wholeSchedule: wholeSchedule,
		descriptionLength: null,
		loadDescription: true,
		loadActivityTrainerName: true,
		loadActivityArea: eventCtx?.showEventActivityArea ? true : false,
	}

	const [searchParams] = useSearchParams();
	const eventId = searchParams.get('eventId');

	const getEventDetail = (eventDetail) => {
		dispatch(eventDetailActions.getEventDetailSuccess(eventDetail));
	}

	const getProperties = (properties) => {
		dispatch(propertiesActions.setProperties(properties));
	}

	const getInstructors = (instructors) => {
		if (Object?.keys(eventDetail)?.length > 0) {
			filterInstructorsBySeating(eventDetail, instructors?.response);
		}

	}
	useEffect(() => {
		sendRequest({
			url: '/northstar-react.classesview/search-event-details-by-id',
			body: {
				...eventParam,
				eventId: eventId
			},
			plId: plId,
			method: 'POST'

		}, getEventDetail)
		dispatch(filterActions.clearAllFilters([day().format('MM/DD/YYYY').toString(), parseInt(eventCtx?.showEventsForNumberOfDays) > 0 ? day().add(parseInt(eventCtx?.showEventsForNumberOfDays) - 1, 'day').format('MM/DD/YYYY').toString() : null, false]));

	}, [sendRequest])

	useEffect(() => {
		fetchData(getDependentMembers).then(response => {
			if (response?.response?.length > 0) {
				// setMembers(response?.response);
				dispatch(memberActions.getDependents(response?.response));
			}
		})
	}, [])

	useEffect(() => {
		if (eventDetail?.siteId > 0) {
			sendRequest({
				url: '/northstar-react.classesview/get-events-properties',
				params: { siteId: eventDetail?.siteId }
			}, getProperties)
		}
	}, [eventDetail]);
	useEffect(() => {
		if (wrapperRef?.current) {
			const elementPosition = wrapperRef.current.offsetTop;
			window.scrollTo({
				top: elementPosition,
				behavior: "smooth"
			});
		}

	}, [wrapperRef])

	useEffect(() => {
		if (eventInstructors?.length === 0 && Object?.keys(eventDetail)?.length > 0) {
			sendRequest({
				url: '/northstar-react.classesview/get-instructors',
			}, getInstructors)
		}

	}, [eventDetail])

	const filterInstructorsBySeating = (eventDetail, instructors) => {

		// Create a new Set to store unique activity trainer names from all seatings
		const activityTrainerNamesSet = new Set();

		// Populate the activityTrainerNamesSet with unique trainer names from seatings
		eventDetail?.schedules?.map((schedule) => {
			schedule?.seatings?.map((seating) => {
				seating?.activityTrainerNames?.forEach((trainerName) => {
					activityTrainerNamesSet?.add(trainerName);
				})
			})
		})
		// Convert the Set back to an Array
		const activityTrainerNames = [...activityTrainerNamesSet];
		// Filter the instructors array based on the activityTrainerNames array
		const filterInstructors = instructors?.filter((instructor) => {
			return activityTrainerNames?.includes(instructor?.employeeName);
		})
		setInstructors(filterInstructors);

	}
	useEffect(() => {
		if (eventDetail !== null) {
			if (Object?.keys(eventDetail)?.length > 0) {
				filterInstructorsBySeating(eventDetail, eventInstructors);
			}
		}
	}, [eventDetail]);
	const handleBackClick = () => {
		navigate(-1);
	}

	const reDirectToResPortel = async () => {
		try {
			const response = await fetch(props.url, {
				method: 'POST',

				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					memberIds: membersData
				})
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			let eventURL = eventCtx?.eventReservationURL;
			if (eventURL === "") {
				eventURL = "/group/pages/events-reservation";
			}
			window.location.href = `${eventURL}?eventId=${eventId}&backURL=${layoutURL}#${eventURL}`;
		} catch (error) {
			console.error('Fetch Error:', error);
		}
	}

	return (
		<>
			{!isMobile ?
				<>
					<div className="cartmini__area">
						<div className={drawer ? 'cartmini__wrapper sc2 opened' : 'cartmini__wrapper sc2'} id="#sc2">
							{drawer && <DrawerComponent onClose={() => setDrawer(false)} eventDetail={eventDetail} members={members} onSetMembersData={onSetMembersData}/>}
						</div>
					</div>
					<div ref={wrapperRef} className="student-course-area pb-10 pt-40">
						<div className="container">
							<div className="row">
								<div className="col-xl-9">
									<button type="button" className="btn btn-success btn-custom-font back-btn" onClick={handleBackClick}>Back</button>
								</div>
								<div className="col-xl-2 text-right">
								</div>
								{eventDetail && Object?.keys(eventDetail)?.length > 0 &&
									<div className="col-xl-1">
										<div className="cart-wrapper mr-30">
											<div className="cart-toggle-btn register-cart ins-cart" >
												<Badge overlap="rectangular" badgeContent={4} color="primary" onClick={() => setDrawer(true)}>
													<FontAwesomeIcon icon={faShoppingCart} className="mr-5" />
												</Badge>
											</div>
										</div>
									</div>
								}
							</div>
						</div>
					</div>
					{loading ?
						<LoaderComponent /> :
						eventDetail && Object?.keys(eventDetail)?.length > 0 ?
							<EventDetails eventDetail={eventDetail} members={members} isMobile={isMobile} instructors={instructors} onSetMembersData={onSetMembersData} membersData={membersData} url={props.url} />
							:
							<CustomAlert severity="error" message="Something went wrong" />
					}
				</>
				:
				<>
					{loading ?
						<LoaderComponent /> :
						eventDetail && Object?.keys(eventDetail)?.length > 0 ?
							<div className='App'>
								<section className="tab-section">
									<TabButtons switchTab={switchTab} activeTab={activeTab} />
									<TabContent activeTab={activeTab} eventDetail={eventDetail} loading={loading} members={members} isMobile={isMobile} instructors={instructors} switchTab={switchTab} onSetMembersData={onSetMembersData} membersData={membersData} />
								</section>

								<div className="register-button">
									<button type="button" className="btn btn-primary btn-custom-font back-btn" onClick={reDirectToResPortel}>{properties?.registerButtonLabel}</button>
								</div>

							</div>
							:
							<CustomAlert severity="error" message="Something went wrong" />
					}
				</>
			}

		</>
	);
}
export default DetailScreen;
