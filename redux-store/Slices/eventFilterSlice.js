import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Statuses: [],
  Instructors: [],
  Type: [],
  Categories: [],
  Age: [],
  Days: [],
  Duration: [],
  Date: [],
  filterData: { eventType: [], eventStatus: [], Instructors: [], Categories: [], Days: [] },
};

const eventFilterSlice = createSlice({
	name: 'event-filters',
	initialState,
	reducers: {
		getFilteredEventStatuses(state, action) {
			const item = action.payload
			const exist = state.Statuses.includes(item);
			if (exist) {
				state.Statuses.splice(state.Statuses.indexOf(item), 1);
			} else {
				state.Statuses.push(action.payload);
			}
		},
		getFilteredEventTypes(state, action) {
			const item = action.payload
			const exist = state.Type.includes(item);
			if (exist) {
				state.Type.splice(state.Type.indexOf(item), 1);
			} else {
				state.Type.push(action.payload);
			}
		},
		getFilteredEventInstructors(state, action) {
			const item = action.payload
			const exist = state.Instructors.includes(item);
			if (exist) {
				state.Instructors.splice(state.Instructors.indexOf(item), 1);
			} else {
				state.Instructors.push(action.payload);
			}
		},
		getFilteredEventCategories(state, action) {
			const item = action.payload
			const exist = state.Categories.includes(item);
			if (exist) {
				state.Categories.splice(state.Categories.indexOf(item), 1);
			} else {
				state.Categories.push(action.payload);
			}
		},
		getFilteredEventAge(state, action) {
			const item = action.payload
			const exist = state.Age.includes(item);
			if (exist) {
				state.Age.splice(state.Age.indexOf(item), 1);
			} else {
				state.Age.push(action.payload);
			}
		},
		getFilteredEventDays(state, action) {
			const item = action.payload
			const exist = state.Days.includes(item);
			if (exist) {
				state.Days.splice(state.Days.indexOf(item), 1);
			} else {
				state.Days.push(action.payload);
			}
		},
		getFilteredEventDuration(state, action) {
			const item = action.payload
			const exist = state.Duration.includes(item);
			if (exist) {
				state.Duration.splice(state.Duration.indexOf(item), 1);
			} else {
				state.Duration.push(action.payload);
			}
		},

		getUpdatedEventFiltersAfterCounts(state, action) {
			state.filterData.eventType = [];
			state.filterData.eventType = action.payload.eventType;
			state.filterData.eventStatus = [];
			state.filterData.eventStatus = action.payload.eventStatus;
			state.filterData.Instructors = [];
			state.filterData.Instructors = action.payload.eventTrainer;
			state.filterData.Categories = [];
			state.filterData.Categories = action.payload.eventCategories;
			state.filterData.Days = [];
			state.filterData.Days = action.payload.eventDays;
		},

		getFilteredEventDate(state, action) {
			state.Date = action.payload;
		},

		updateEventDate(state, action) {

			state.Date = action.payload;
		},

		clearFilteredEventType(state, action) {
			state.Type = [];
		},
		clearFilteredEventStatus(state, action) {
			const length = state.Statuses.length;
			state.Statuses?.splice(0, length);
		},
		clearFilteredEventInstructor(state, action) {
			state.Instructors = [];
		},
		clearFilteredEventCategories(state, action) {
			state.Categories = [];
		},
		clearFilteredEventDays(state, action) {
			state.Days = [];
		},

		clearEventDate(state, action) {
			state.Date = action.payload;
		},
		clearAllFilters(state, action) {
			state.Type = [];
			state.Statuses = [];
			state.Instructors = [];
			state.Categories = [];
			state.Days = [];
			state.Date = action.payload;
		}
	}
})


export default eventFilterSlice;