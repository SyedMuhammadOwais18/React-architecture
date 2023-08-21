import {configureStore, combineReducers } from '@reduxjs/toolkit';
import day from 'dayjs';
import eventFilterSlice from './Slices/eventFilterSlice';
import eventDetailSlice from './Slices/eventDetailSlice';
import propertiesSlice from './Slices/eventPropertiesSlice';
import reservationPanelSlice, { initailReservationPanelState } from './Slices/eventReservationPanelSlice';
import memberSlice, { initialMemberState } from './Slices/memberSlice';
import eventReservationSlice, { initialEventReservationState } from './Slices/eventReservationSlice';
const initialState = {
	Statuses: [],
	Instructors: [],
	Type: [],
	Categories: [],
	Age: [],
	Days: [],
	Duration: [],
	Date: [day().format('MM/DD/YYYY').toString(), null, false],
	filterData: { eventType: [], eventStatus: [], Instructors: [], Categories: [], Days: [] }
};
const initialEventDetailsState = {
	event: [],
	isLoading: false,
	error: null,
};

const initialPropertiesState = {
	eventsSettings: {},
	portalReservationSettings: {},
	eventPortalBooleanProperties: {},
	reservationSettings: {},
	eventPortalLabels: {},
	eventPortalGolfLabels: {},
	eventPortalDetailCatalogLabels: {},
	memberPrivileges: {},
}

const fetchContextData = async (eventContextData,eventObj) => {
	console.log("Event Object : ",eventObj);
	return {
		eventFilters: {
			...initialState,
			Date: [day().format('MM/DD/YYYY').toString(), parseInt(eventContextData?.showEventsForNumberOfDays) > 0 ? day().add(parseInt(eventContextData?.showEventsForNumberOfDays) - 1, 'day').format('MM/DD/YYYY').toString() : null, false]
		},
		eventDetails: initialEventDetailsState,
		properties: initialPropertiesState,
		reservation: initailReservationPanelState,
		members: {
			...initialMemberState ,
			isAdmin : eventObj.isAdmin
		},
		eventReservation: initialEventReservationState,

	}

}

const rootReducer = combineReducers({
	eventFilters: eventFilterSlice.reducer,
	eventDetails: eventDetailSlice.reducer,
	properties: propertiesSlice.reducer,
	reservation: reservationPanelSlice.reducer,
	members: memberSlice.reducer,
	eventReservation: eventReservationSlice.reducer,
})

const setupStore = async (eventContext,eventObj) => {
	try {
		const preloadedState = await fetchContextData(eventContext,eventObj);
		const store = configureStore({ reducer: rootReducer, preloadedState });
		return store;
	} catch (error) {
		throw error;
	}
}
//action creaters triggers reducer function to update the global state/store
//filterSlice.actions.getFilteredEventStatuses() returns an action object with {type : 'some auto-generated identifier'}
export default setupStore;
export const filterActions = eventFilterSlice.actions;
export const eventDetailActions = eventDetailSlice.actions;
export const propertiesActions = propertiesSlice.actions;
export const reservationPanelActions = reservationPanelSlice.actions;
export const memberActions = memberSlice.actions;
export const eventReservationActions = eventReservationSlice.actions;