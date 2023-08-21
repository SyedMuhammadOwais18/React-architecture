import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { filterActions } from '../../redux-store/index.js';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const DayOfTheWeekComponent = (props) => {
	const dispatch = useDispatch();
	const [showMore, setShowMore] = useState(false);
	const eventDays = useSelector((state) => state.eventFilters.filterData.Days);
	const checkedEventDays = useSelector((state) => state.eventFilters.Days);
	const [expand, setExpand] = React.useState(true);
	const toggleAccordion = () => {
		setExpand((prev) => !prev);
	};
	const handleChange = (eventDayName) => {

		dispatch(filterActions.getFilteredEventDays(eventDayName));
	};

	const clearEventDay = (event) => {

		dispatch(filterActions.clearFilteredEventDays());
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
						<h3> Day Of The Week </h3>
						{checkedEventDays.length > 0 && <img src="/o/northstar-react-portlet/images/default-clear-single-filter-icon.png" className="m-auto" alt="image not found" onClick={clearEventDay} />}
					</div>
				</AccordionSummary>
				<AccordionDetails className="flex-direction">
					<>

						<FormGroup >
							<>
								{eventDays?.slice(0, 5)?.map((eventDay, index) => (

									<FormControlLabel
										key={index}
										control={
											<Checkbox
												value={eventDay.week_name}
												onChange={() => handleChange(eventDay.week_name)}
												checked={checkedEventDays.includes(eventDay.week_name)}
												name={eventDay.week_name}
												color="primary"
											/>
										}
										label={`${eventDay.week_name} (${eventDay.count})`}
									/>


								))}
								{showMore &&
									eventDays?.slice(5)?.map((eventDay, index) => (

										<FormControlLabel
											key={index}
											control={
												<Checkbox
													value={eventDay.week_name}
													onChange={() => handleChange(eventDay.week_name)}
													checked={checkedEventDays.includes(eventDay.week_name)}
													name={eventDay.week_name}
													color="primary"
												/>
											}
											label={`${eventDay.week_name} (${eventDay.count})`}
										/>


									))
								}
								{eventDays?.length > 5 && !showMore &&
									<Button variant="outlined" color="primary" onClick={() => setShowMore(true)}>
										Show More
									</Button>
								}
								{eventDays?.length > 5 && showMore &&
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
export default DayOfTheWeekComponent;