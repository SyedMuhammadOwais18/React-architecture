import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { filterActions } from '../../redux-store/index';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const StatusComponent = (props) => {
	const [showMore, setShowMore] = useState(false);
	const dispatch = useDispatch();
	const event = useSelector((state) => state.eventFilters.filterData.eventStatus);
	const checkedEventStatus = useSelector((state) => state.eventFilters.Statuses);
	const [expand, setExpand] = React.useState(true);
	const toggleAccordion = () => {
		setExpand((prev) => !prev);
	};
	const handleChange = (eventStatusId) => {
		// filter actions contains method names created in index.js and it uses it as a unique identifier and it automatically creates the action object with type and payload field
		dispatch(filterActions.getFilteredEventStatuses(eventStatusId));
	};
	const clearEventStatus = (event) => {


		dispatch(filterActions.clearFilteredEventStatus());
		event.stopPropagation();

	}
	return (
		<div className="course-sidebar-widget">
			<Accordion expanded={expand} onChange={toggleAccordion}>
				<AccordionSummary
					aria-label="Expand"
					aria-controls="additional-actions-content-1"
					id="additional-actions-header-1"
					expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
				>
					<div className="d-flex">
						<h3> Status </h3>
						{checkedEventStatus.length > 0 && <img src="/o/northstar-react-portlet/images/default-clear-single-filter-icon.png" className="m-auto" alt="image not found" onClick={clearEventStatus} />}
					</div>
				</AccordionSummary>
				<AccordionDetails className="flex-direction">
					<>

						<FormGroup >
							<>
								{event?.slice(0, 5)?.map((eventStatus, index) => (

									<FormControlLabel
										key={index}
										control={
											<Checkbox
												value={eventStatus.eventStatusName}
												checked={checkedEventStatus.includes(eventStatus.eventid)}
												onChange={() => handleChange(eventStatus.eventid)}
												name={eventStatus.eventStatusName}
												color="primary"
											/>
										}
										label={<>{eventStatus.eventStatusName} ({eventStatus.count}) <span className={`color-box events-advancelisting-eventstatus-${eventStatus?.eventStatusName?.replace(/\s/g, "")}`}></span> </>}

									/>




								))}
								{showMore && event?.slice(5)?.map((eventStatus, index) => (

									<FormControlLabel
										key={index}
										control={
											<Checkbox
												value={eventStatus.eventStatusName}
												checked={checkedEventStatus.includes(eventStatus.eventid)}
												onChange={() => handleChange(eventStatus.eventid)}
												name={eventStatus.eventStatusName}
												color="primary"
											/>
										}
										label={<>{eventStatus.eventStatusName} ({eventStatus.count}) <span className={`color-box events-advancelisting-eventstatus-${eventStatus?.eventStatusName?.replace(/\s/g, "")}`}></span> </>}
									/>


								))}
								{event?.length > 5 && !showMore &&
									<Button variant="outlined" color="primary" onClick={() => setShowMore(true)}>
										Show More
									</Button>
								}
								{event?.length > 5 && showMore &&
									<Button variant="outlined" color="primary" onClick={() => setShowMore(false)}>
										Show Less
									</Button>
								}
							</>
						</FormGroup>
					</>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
export default React.memo(StatusComponent);