import React, { useState, useCallback, useContext, useEffect } from "react";
import DisplayResultComponent from "./../../components/event-classes/DisplayResultComponent";
import EventContext from "../../store/event-classes/event-context";
import day from 'dayjs';
import fetchData from "../../connection/ApiRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { filterActions } from '../../redux-store/index.js';
import LoaderComponent from "../../components/event-classes/LoaderComponent";
import StickyHeaderComponent from "../../components/event-classes/StickyHeaderComponent";
import FeaturedEventList from "../../components/event-classes/FeaturedEventList";
import MobileSidebar from "../../components/event-classes/MobileSidebar";
import Header from "../../components/event-classes/Header";
import DesktopSidebar from "../../components/event-classes/DesktopSidebar";
import EventList from "../../components/event-classes/EventList";
import { appendCountToDataHandler, convertStringToArray } from "../../Utility/event-classes/functions/AppendCounts";
import { weekDays } from "../../Utility/event-classes/Data/Data";
import useHttp from "../../Hooks/useHttp";
import useWindowSize from "../../Hooks/useWindowSize";
import CustomAlert from "../../components/event-classes/CustomAlert";
let isInitialScroll = true;
const HomeScreen = (props) => {
	const { width } = useWindowSize();
	const isMobile = width <= 768;
	const eventCtx = useContext(EventContext);
	const { loading, error, sendRequest } = useHttp();
	const filterEventStatuses = useSelector((state) => state.eventFilters.Statuses);
	const filterEventTypes = useSelector((state) => state.eventFilters.Type);
	const filterEventInstructors = useSelector((state) => state.eventFilters.Instructors);
	const filterEventCategories = useSelector((state) => state.eventFilters.Categories);
	const filterEventDays = useSelector((state) => state.eventFilters.Days);
	const eventTypes = useSelector((state) => state.eventFilters.filterData.eventType);
	const getEventStatusesFromStore = useSelector((state) => state.eventFilters.filterData.eventStatus);
	const getEventInstructorsFromStore = useSelector((state) => state.eventFilters.filterData.Instructors);
	const getEventCategoriesFromStore = useSelector((state) => state.eventFilters.filterData.Categories);
	const getEventDaysFromStore = useSelector((state) => state.eventFilters.filterData.Days);
	const fromDate = useSelector((state) => state.eventFilters.Date[0]);
	const toDate = useSelector((state) => state.eventFilters.Date[1]);
	const dateChange = useSelector((state) => state.eventFilters.Date);
	const descLength = parseInt(eventCtx?.eventDescLength);
	const dispatch = useDispatch();
	const wrapperRef = useRef(null);

	var eventStatusesTypes = ['Unavailable', 'Future', 'Reserved', 'Wait List', 'Available', 'No Registration', 'Lottery', 'Lottery Requested', 'On Waitlist'];

	let filterEvents = [];
	//get Event Types Ids from the event Types array
	const portalURL = Liferay.ThemeDisplay.getPortalURL();
	const plId = Liferay.ThemeDisplay.getPlid();

	const authToken = '?p_auth=' + Liferay.authToken;
	const getInitialFilterURL = portalURL + '/api/jsonws/northstar-react.classesview/get-filter-initial/' + authToken;
	const memberId = parseInt(Liferay.ThemeDisplay.getNsMemberId());

	const view = eventCtx?.view;
	const wholeSchedule = eventCtx?.multiDayEventAsSingleEvent && eventCtx?.view == 1;
	const event = convertStringToArray(eventCtx?.eventTypes);
	const eventStatuses = convertStringToArray(eventCtx?.eventStatuses);
	const calendarPageURL = eventCtx?.calendarPageURL;
	const dataSize = eventCtx?.paginationCount;
	const showOverlay = false;

	const [showAccordion, setShowAccordion] = useState(true);
	const [displayProperty, setDisplayProperty] = useState(true);
	const [showSelect, setShowSelect] = useState(false);
	const [drawer, setDrawer] = useState(false);
	const [events, setEvents] = useState(props.eventModel);
	const [featuredEvents, setFeaturedEvents] = useState(props.eventFeatures);
	const [page, setPage] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [searchEvents, setSearchEvents] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [checkFilter, setCheckFilter] = useState(false);
	const [totalEvents, setTotalEvents] = useState(props.totalEvents);
	const [isInitial, setIsInitial] = useState(true);
	const [isPaginateInitial, setIsPaginateInitial] = useState(true);
	const [isSearchInitial, setIsSearchInitial] = useState(true);
	const [stopApiTriggerForDate, setStopApiTriggerForDate] = useState(0);

	const eventParams = {
		memberId: memberId,
		eventTypeIds: filterEventTypes,
		view: view,
		wholeSchedule: wholeSchedule,
		eventOnlineStatuses: filterEventStatuses.length > 0 ? filterEventStatuses : eventCtx?.eventStatuses,
		eventTrainerIds: filterEventInstructors,
		filterIds: filterEventCategories,
		eventFilterDays: filterEventDays,
		fromDate: fromDate,
		toDate: toDate,
		descriptionLength: descLength,
		loadDescription: true,
		loadActivityTrainerName: true,
		loadActivityArea: eventCtx?.showEventActivityArea ? true : false,
		dataFrom: 1,
		dataSize: dataSize,
		preferencesEventTypeIds: eventCtx?.eventTypes,
		preferencesFilterIds: eventCtx?.selectedCategoryFilters
	}
	const getCountsMapAndFilterDataObj = (...args) => {
		const countsMap = {
			'filterEventTypeCount': args[0],
			'filterEventStatusCount': args[1],
			'filterEventTrainerCount': args[2],
			'filterEventCategorySubFilterCount': args[3],
			'filterEventDayFilterCount': args[4]
		}
		const filterDataObj = {
			'eventTypes': args[5],
			'eventStatuses': args[6],
			'eventTrainers': args[7],
			'eventCategories': args[8],
			'eventDays': args[9]

		}
		return [countsMap, filterDataObj];

	}

	const getSearchResult = (response) => {
		if (response?.events) {
			setSearchEvents(response.events);
		}
	}

	const getLazyLoadData = (response) => {
		if (response?.events) {
			setEvents((prevEvents) => [...prevEvents, ...response.events]);
		}
	}

	const getFilteredData = (response) => {
		setIsLoading(false);
		setTotalEvents(response?.totalEvents);
		setPage(1);
		if (response?.events) {
			setEvents(response?.events);
		}
		const [countsMap, filterDataObj] =
			getCountsMapAndFilterDataObj(
				response?.eventTypeCounts,
				response?.eventStatusCounts,
				response?.eventTrainerCounts,
				response?.eventFilterCounts,
				response?.eventFilterDayCounts,
				eventTypes,
				getEventStatusesFromStore,
				getEventInstructorsFromStore,
				getEventCategoriesFromStore,
				getEventDaysFromStore
			)
		dispatchHandlerAfterAddingCounts(countsMap, filterDataObj);
	}
	const getPreferencesSelectedEventStatuses = () => {
		let getPreferencesSelectedEventStatuses = [];
		for (let i = 0; i < eventStatuses?.length; i++) {
			var index = eventStatuses[i];
			getPreferencesSelectedEventStatuses.push({ 'eventid': index, 'eventStatusName': eventStatusesTypes[index] });
		}
		return getPreferencesSelectedEventStatuses;
	}

	const dispatchHandlerAfterAddingCounts = (countsMap, filtersDataObj) => {
		let filterEventType = [];
		let filterEventTrainer = [];
		let filterEventCategorySubFilter = [];
		let filterEventStatus = [];
		let filterEventDays = [];

		if (countsMap?.filterEventTypeCount !== null) {
			filterEventType = appendCountToDataHandler(countsMap?.filterEventTypeCount, filtersDataObj?.eventTypes, 'eventTypeId');
		}
		if (countsMap?.filterEventTrainerCount !== null) {
			filterEventTrainer = appendCountToDataHandler(countsMap?.filterEventTrainerCount, filtersDataObj?.eventTrainers, 'employeeId');
		}
		if (countsMap?.filterEventCategorySubFilterCount !== null) {
			filterEventCategorySubFilter = appendCountToDataHandler(countsMap?.filterEventCategorySubFilterCount, filtersDataObj?.eventCategories, 'filterId');
		}
		if (countsMap?.filterEventStatusCount !== null) {
			filterEventStatus = appendCountToDataHandler(countsMap?.filterEventStatusCount, filtersDataObj?.eventStatuses, 'eventid');
		}
		if (countsMap?.filterEventDayFilterCount) {
			filterEventDays = appendCountToDataHandler(countsMap?.filterEventDayFilterCount, filtersDataObj?.eventDays, 'week_name');
		}
		const filterEventsWithoutCount = {
			'eventType': filterEventType,
			'eventTrainer': filterEventTrainer,
			'eventCategories': filterEventCategorySubFilter,
			'eventStatus': filterEventStatus,
			'eventDays': filterEventDays

		}
		dispatch(filterActions?.getUpdatedEventFiltersAfterCounts(filterEventsWithoutCount));
	}



	useEffect(() => {
		const getPreferencesSelectedEventStatus = getPreferencesSelectedEventStatuses();
		fetchData(getInitialFilterURL).then(response => {
			if (response.OK) {
				filterEvents = response?.response?.eventTypes?.filter(eventType => event?.includes(eventType?.eventTypeId))
				const [countsMap, filterDataObj] =
					getCountsMapAndFilterDataObj(
						props?.filterEventTypeCount,
						props?.filterEventStatusCount,
						props?.filterEventTrainerCount,
						props?.filterEventCategorySubFilterCount,
						props?.filterEventDayFilterCount,
						filterEvents,
						getPreferencesSelectedEventStatus,
						response?.response?.eventTrainer,
						response?.response?.eventFilters,
						weekDays
					)
				dispatchHandlerAfterAddingCounts(countsMap, filterDataObj);

			}
		})
	}, [])

	useEffect(() => {
		if (isInitial) {
			setIsInitial(false);
			return;
		}

		const timer = setTimeout(() => {
			setIsLoading(true);
			sendRequest({
				url: '/northstar-react.classesview/save-reservation',
				body: {
					...eventParams,
					dataFrom: 1,
					dataSize: dataSize
				},
				plId: plId,
				portletId: props?.portletId,
				method: 'post'
			}, getFilteredData)

		}, 800)
		return () => clearTimeout(timer);

	}, [filterEventTypes, filterEventStatuses, fromDate, toDate, dateChange[2], filterEventInstructors, filterEventCategories, filterEventDays]);

	useEffect(() => {
		if (isPaginateInitial) {
			setIsPaginateInitial(false);
			return;
		}
		if (page == 1) {
			return;
		}
		sendRequest({
			url: '/northstar-react.classesview/save-reservation',
			body: {
				...eventParams,
				dataFrom: page,
				dataSize: dataSize
			},
			plId: plId,
			portletId: props?.portletId,
			method: 'post'
		}, getLazyLoadData)

	}, [page, sendRequest])

	useEffect(() => {
		if (isSearchInitial) {
			setIsSearchInitial(false);
			return;
		}
		const timer = setTimeout(() => {
			if (searchValue?.length > 0) {
				sendRequest({
					url: '/northstar-react.classesview/search-events',
					body: {
						...eventParams,
						searchStr: searchValue
					},
					plId: plId,
					portletId: props?.portletId,
					method: 'post'
				}, getSearchResult)
			}

		}, 800)

		return () => clearTimeout(timer);

	}, [searchValue, sendRequest])

	const handleInfiniteScroll = async () => {
		try {
			if (isInitialScroll) {
				isInitialScroll = false;
				return;
			}

			if (totalEvents > (page * dataSize)) {

				if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {


					setPage((prevState) => prevState + 1)
				}
			}

		} catch (error) {
		}

	}
	useEffect(() => {
		window.addEventListener("scroll", handleInfiniteScroll)
		return () => window.removeEventListener("scroll", handleInfiniteScroll);

	}, [page, totalEvents])


	useEffect(() => {
		if (error || wrapperRef?.current) {
			const elementPosition = wrapperRef.current.offsetTop;
			window.scrollTo({
				top: elementPosition,
				behavior: "smooth"
			});
		}
		
	}, [error, filterEventTypes, filterEventStatuses, fromDate, toDate, dateChange[2], filterEventInstructors, filterEventCategories, filterEventDays])


	const showAccordionHandler = () => {

		setShowAccordion((prevState) => !prevState);

		if (showAccordion) {
			setTimeout(() => {
				setDisplayProperty(false);
			}, 500);
		}
		else {
			setDisplayProperty(true);
		}
	};

	const showSearchOverlayHandler = useCallback(() => {
		props.handleShowOverlay(!showOverlay);
	}, []);


	const onSearchChangeHandler = (searchValue) => {

		setSearchValue(searchValue);
	}
	const filterSliderHandler = (checkFilter) => {
		setCheckFilter(checkFilter);
	}

	const closeSideBarHandler = (checkFilter) => {
		setCheckFilter(checkFilter);
	}

	const clearAllFilters = () => {
		dispatch(filterActions.clearAllFilters([day().format('MM/DD/YYYY').toString(), parseInt(eventCtx?.showEventsForNumberOfDays) > 0 ? day().add(parseInt(eventCtx?.showEventsForNumberOfDays) - 1, 'day').format('MM/DD/YYYY').toString() : null, false]));
	}

	return (
		<>
			<div id="fade-wrapper"></div>
			{/* <div className="cartmini__area">
				<div className={drawer ? 'cartmini__wrapper sc2 opened' : 'cartmini__wrapper sc2'} id="#sc2">
					{drawer && <DrawerComponent toggle={drawer} onGetCloseClass={onGetCloseClassHandler} />}
				</div>
			</div> */}
			<main className={drawer ? "right-cart-margin" : "left-cart-margin"}>
				{isMobile && <StickyHeaderComponent isAdmin={memberId} onSearch={onSearchChangeHandler} showSearchOverlayHandler={showSearchOverlayHandler} data={searchEvents} show={props.show} checkIsMobile={isMobile} openFilterSliderHandler={filterSliderHandler} checkFilter={checkFilter} />}
				{featuredEvents && featuredEvents?.length > 0 &&
					<div className="col-xl-4 col-lg-5">
						<h2 className='d-inline home-screen-card-heading'>Featured Events</h2>

					</div>
				}
				{featuredEvents && featuredEvents?.length > 0 && <FeaturedEventList featuredEvents={featuredEvents} isMobile={isMobile} />}
				<div ref={wrapperRef}>
					{
						!isMobile &&
						<Header
							onSearch={onSearchChangeHandler} showSearchOverlayHandler={showSearchOverlayHandler} data={searchEvents} show={props.show}
							filterData={events?.length > 0 ? events?.length : 0}
							totalData={totalEvents > 0 ? totalEvents : 0}
							onClick={showAccordionHandler} onClearAll={clearAllFilters}
						/>

					}

					{isMobile && eventCtx?.showEventCount &&
						<DisplayResultComponent filterData={events?.length > 0 ? events?.length : 0} totalData={totalEvents > 0 ? totalEvents : 0} />
					}
				</div>
				<div className="root-container">
					<>

						<div className="row">
							{!isMobile &&
								<DesktopSidebar showAccordion={showAccordion} displayProperty={displayProperty} eventStatuses={eventStatuses} />
							}
							{isMobile &&
								<MobileSidebar closeSidebar={closeSideBarHandler} onClick={clearAllFilters} eventStatuses={eventStatuses} />
							}
							<div className={`${showAccordion ? 'col-xl-9' : 'col-xl-12'} col-lg-8 col-md-12`}>

								<h2 className="home-screen-card-heading event-heading">{eventCtx?.heading}</h2>

								{!isLoading ?
									(error ?
										<div>
											<CustomAlert severity="error" message={error} />
										</div> :
										(events?.length > 0 ?
											<>
												<div className="row">


													<EventList paginateData={events} showAccordion={showAccordion} showSelect={showSelect} />
													{loading && <LoaderComponent />}

												</div>
												{/* <PaginationComponent onPageChange={pageChangeHandler} data={events} /> */}
											</>
											:
											<CustomAlert severity="warning" message={eventCtx?.noEventsMessage} />

										)
									)
									: <LoaderComponent />}

								{calendarPageURL && <a href={`${portalURL}/group/pages/clubcalendar`}>Calendar</a>}
							</div>
						</div>

					</>
				</div>
			</main>
		</>
	)
}
export default HomeScreen;
