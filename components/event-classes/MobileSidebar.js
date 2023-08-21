import { useContext, useState } from "react";
import React from 'react';

import { useSelector } from "react-redux";
import EventContext from "../../store/event-classes/event-context";
import SearchByDateComponent from "./SearchByDateComponent";
import StatusComponent from "./StatusComponent";
import TypeComponent from "./TypeComponent";
import InstructorsComponent from "./InstructorsComponent";
import CategoriesComponent from "./CategoriesComponent";
import DayOfTheWeekComponent from "./DayOfTheWeekComponent";


const MobileSidebar = (props) => {
    const eventCtx = useContext(EventContext);
    // const [checkFilter, setCheckFilter] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const filterEventStatuses = useSelector((state) => state.eventFilters.Statuses);
    const filterEventTypes = useSelector((state) => state.eventFilters.Type);
    const isDateSelected = useSelector((state) => state.eventFilters.Date[2]);

    const closeSidebar = () => {
        props.closeSidebar(false);
    }
    return (
        <div className="bt52">

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

                <div className="offcanvas-header">

                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={closeSidebar}></button>

                    {(filterEventTypes.length > 0 || filterEventStatuses.length > 0 || isDateSelected) && <button type="button" className="btn btn-primary w-auto reset-all" onClick={props.onClick}>Reset All</button>}
                    <button type="button" className="btn btn-primary w-auto" data-bs-dismiss="offcanvas" aria-label="Close" onClick={closeSidebar}>Apply Filters</button>
                </div>
                <div className="offcanvas-body">
                    <SearchByDateComponent data={filteredList} />
                    {eventCtx?.showEventStatuses && props.eventStatuses?.length > 0 && <StatusComponent eventStatuses={props.eventStatuses} />}
                    <TypeComponent />
                    <InstructorsComponent />
                    <CategoriesComponent />
                    <DayOfTheWeekComponent/>
                </div>

            </div>
        </div>
    );
}

export default MobileSidebar;