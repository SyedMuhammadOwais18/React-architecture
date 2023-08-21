import React, { useContext, createContext, useReducer } from 'react';
import { reducerFun } from "./reducerFun.js";
const initialState = {
	date: "",
	paginateData: [0],
	originalData: [0],
	filteredData: [],
	filteredEvents: [],
	filterDays: [],
	
};
const FilterContext = createContext(initialState);
const FilterProvider = ({ children }) => {
	const [state, filterDispatch] = useReducer(reducerFun, { date: "", paginateData: [0], originalData: [0], filteredData: [], filteredEvents: [], filterDays: [], totalData: 0  })
	return (
		<FilterContext.Provider value={{ state, filterDispatch }}>{children}</FilterContext.Provider>
	)
}
const useFilter = () => useContext(FilterContext);

export { useFilter, FilterProvider };