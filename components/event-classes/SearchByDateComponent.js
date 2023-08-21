import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Calendar from 'react-calendar';
import day from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { filterActions } from '../../redux-store/index.js';
import EventContext from '../../store/event-classes/event-context.js';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
let clearDate = false;
let counterClearDate = 0;
const SearchByDateComponent = (props) => {
  const dispatch = useDispatch();
  const isFilterSelected = useSelector((state) => state.eventFilters.Date[2]);
  const [dateState, setDateState] = useState(null);
  const [expand, setExpand] = React.useState(true);
  const eventCtx = useContext(EventContext);

  useEffect(() => {
    if (!clearDate) {
      clearDate = true;
      counterClearDate += 1;
      return;
    }
    if (!isFilterSelected) {
      setDateState(null);
    }
  }, [isFilterSelected])

  const toggleAccordion = () => {
    setExpand((prev) => !prev);
  };
  const onChange = (e) => {

    const startDate = day(e[0]);
    const endDate = day(e[1]);

    if (startDate.isValid() && endDate.isValid()) {
      const start = startDate.format('MM/DD/YYYY').toString();
      const end = endDate.format('MM/DD/YYYY').toString();
      dispatch(filterActions.getFilteredEventDate([start, end, true]));
      setDateState(e);
    }

  }

  const clearEventDates = (event) => {

    dispatch(filterActions.clearEventDate([day().format('MM/DD/YYYY').toString(), parseInt(eventCtx?.showEventsForNumberOfDays) > 0 ? day().add(parseInt(eventCtx?.showEventsForNumberOfDays) - 1, 'day').format('MM/DD/YYYY').toString() : null, false]));
    setDateState(null);
    event.stopPropagation();
  }
  return (
    <div className="course-sidebar-widget">
      <Accordion expanded={expand} onChange={toggleAccordion}>
        <AccordionSummary
          expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
          aria-label="Expand"
          aria-controls="additional-actions-content-1"
          id="additional-actions-header-1"
        >
          <div className="d-flex">
            <h3> Search By Date </h3>
            {isFilterSelected && <img src="/o/northstar-react-portlet/images/default-clear-single-filter-icon.png" className="m-auto" alt="image not found" onClick={clearEventDates} />}
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex-direction">


          <Calendar selectRange={true} value={dateState} onChange={onChange} />

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default SearchByDateComponent;