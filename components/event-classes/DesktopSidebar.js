import { useContext, useState } from "react";
import React from 'react';
import EventContext from "../../store/event-classes/event-context";
import SearchByDateComponent from "./SearchByDateComponent";
import StatusComponent from "./StatusComponent";
import TypeComponent from "./TypeComponent";
import InstructorsComponent from "./InstructorsComponent";
import CategoriesComponent from "./CategoriesComponent";
import DayOfTheWeekComponent from "./DayOfTheWeekComponent";

const DesktopSidebar = (props) => {
    const [filteredList, setFilteredList] = useState([]);
    const eventCtx = useContext(EventContext);
    return (
        <div className={`col-xl-3 col-lg-4 col-md-8 col-sm-3 box1 btn_demo ${props?.showAccordion ? 'display_block' : 'display_none'} ${props?.displayProperty ? 'display-block' : 'display-none'}`}>
            <div className={`btn_demo ${props?.showAccordion ? 'display_block' : 'display_none'}`}>
                <SearchByDateComponent data={filteredList} />
                {eventCtx?.showEventStatuses && props?.eventStatuses?.length > 0 && <StatusComponent eventStatuses={props?.eventStatuses} />}
                <TypeComponent />
                <InstructorsComponent />
                <CategoriesComponent />
                <DayOfTheWeekComponent/>
            </div>
        </div>
    );
}

export default DesktopSidebar;