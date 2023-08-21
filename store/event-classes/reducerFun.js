export const reducerFun = (state, action) => {

	switch (action.type) {


		case 'FILTER_DATE':
			return {
				...state,
				date: action.payload
			}

		case 'FILTER_PAGINATION_WITHOUTDATE':
			return {
				...state,
				paginateData: action.payload
			}
		case 'FILTER_DATA_NOT_EXIST':
			return {
				...state,
				paginateData: action.payload
			}
		case 'FILTER_PAGINATION_DATE':
			return {
				...state,
				paginateData: action.payload
			}
		case 'ORIGINAL_DATA':
			return {
				...state,
				originalData: action.payload
			}
		case 'FILTERED_DATA':
			return {
				...state,
				filteredData: action.payload
			}

		case 'FILTERED_DAY_DATA':
			return {
				...state,
				filteredData: action.payload
			}
		case 'FILTERED_EVENTS':
			return {
				...state,
				filteredEvents: action.payload
			}
		case 'FILTERED_DAY_AND_DATE_EVENTS':
			return {
				...state,
				filteredData: action.payload
			}
		case 'ADD_FILTER_DAY':
			return {
				...state,
				filteredDays: action.payload
			}
		case 'REMOVE_FILTER_DAY':
			return {
				...state,
				filteredDays: action.payload
			}
		case 'FILTERED_DAY_EVENTS':
			return {
				...state,
				filteredData: action.payload
			}
		case 'CLEAR_DATE_FILTER':

			return {
				...state,
				date: action.payload.date,
				filteredData: action.payload.data
			}
		case 'CLEAR_DATE_FILTER_WHEN_DAY_NOT_SELECTED':

			return {
				...state,
				filteredData: action.payload
			}
		case 'AFTER_REMOVING_ALL_FILTERS':
			return {
				...state,
				filteredData: action.payload
			}
		case 'CLEAR_DAY_FILTER':
			return {
				...state,
				filterDays: action.payload
			}


		case 'CLEAR_ALL_FILTERS':

			return {
				...state,
				date: action.payload.date,
				filterDays: action.payload.filters
			}
		
		case 'TOTAL_DATA_COUNT':

			return {
				...state,
				totalData: action.payload
			}


		default:
			return state
	}
}
