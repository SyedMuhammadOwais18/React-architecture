import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { filterActions } from '../../redux-store/index.js';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const InstructorsComponent = (props) => {
	const dispatch = useDispatch();
	const instructors = useSelector((state) => state.eventFilters.filterData.Instructors);
	const checkedEventTrainer = useSelector((state) => state.eventFilters.Instructors);
	const [showMore, setShowMore] = useState(false);
	const [expand, setExpand] = useState(true);
	const toggleAccordion = () => {
		setExpand((prev) => !prev);
	};
	const handleChange = (eventTrainerId) => {

		dispatch(filterActions.getFilteredEventInstructors(eventTrainerId));
	};
	const clearEventInstructor = (event) => {


		dispatch(filterActions.clearFilteredEventInstructor());
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
						<h3> Instructors </h3>
						{checkedEventTrainer.length > 0 && <img src="/o/northstar-react-portlet/images/default-clear-single-filter-icon.png" className="m-auto" alt="image not found" onClick={clearEventInstructor} />}
					</div>
				</AccordionSummary>
				<AccordionDetails className="flex-direction">
					<>

						<FormGroup >
							<>
								{instructors?.slice(0, 5)?.map((eventTrainer, index) => (

									<FormControlLabel
										key={index}
										control={
											<Checkbox
												value={eventTrainer.employeeName}
												checked={checkedEventTrainer.includes(eventTrainer.employeeId)}
												onChange={() => handleChange(eventTrainer.employeeId)}
												name={eventTrainer.employeeName}
												color="primary"
											/>
										}
										label={<>{eventTrainer.employeeName} ({eventTrainer.count}) <span className={`color-box events-advancelisting-eventTrainer-${eventTrainer?.employeeName?.replace(/\s/g, "")}`}></span> </>}

									/>




								))}
								{showMore && instructors?.slice(5)?.map((eventTrainer, index) => (

									<FormControlLabel
										key={index}
										control={
											<Checkbox
											value={eventTrainer.employeeName}
											checked={checkedEventTrainer.includes(eventTrainer.employeeId)}
											onChange={() => handleChange(eventTrainer.employeeId)}
											name={eventTrainer.employeeName}
											color="primary"
											/>
										}
										label={<>{eventTrainer.employeeName} ({eventTrainer.count}) <span className={`color-box events-advancelisting-eventTrainer-${eventTrainer?.employeeName?.replace(/\s/g, "")}`}></span> </>}
									/>


								))}
								{instructors?.length > 5 && !showMore &&
									<Button variant="outlined" color="primary" onClick={() => setShowMore(true)}>
										Show More
									</Button>
								}
								{instructors?.length > 5 && showMore &&
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
export default React.memo(InstructorsComponent);