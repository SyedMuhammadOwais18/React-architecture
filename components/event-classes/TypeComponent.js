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
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const TypeComponent = (props) => {
	const dispatch = useDispatch();
	const [showMore, setShowMore] = useState(false);
	const eventTypes = useSelector((state) => state.eventFilters.filterData.eventType);
	const checkedEventType = useSelector((state) => state.eventFilters.Type);
	const [expand, setExpand] = React.useState(true);
	const length = eventTypes.length - 1;
	const toggleAccordion = () => {
		setExpand((prev) => !prev);
	};
	const handleChange = (eventTypeId) => {

		dispatch(filterActions.getFilteredEventTypes(eventTypeId));
	};

	const clearEventType = (event) => {

		dispatch(filterActions.clearFilteredEventType());
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
						<h3> Type </h3>
						{checkedEventType.length > 0 && <img src="/o/northstar-react-portlet/images/default-clear-single-filter-icon.png" className="m-auto" alt="image not found" onClick={clearEventType} />}
					</div>
				</AccordionSummary>
				<AccordionDetails className="flex-direction">
					<>

						<FormGroup >
							<>
								{eventTypes?.slice(0, 5)?.map((eventType, index) => (
									(eventType.eventTypeCount !== 0 &&
										<FormControlLabel
											key={index}
											control={
												<Checkbox
													value={eventType.eventTypeName}
													onChange={() => handleChange(eventType.eventTypeId)}
													checked={checkedEventType.includes(eventType.eventTypeId)}
													name={eventType.eventTypeName}
													color="primary"
												/>
											}
											label={`${eventType.eventTypeName} (${eventType.count})`}
										/>
									)

								))}
								{showMore && eventTypes?.slice(5, length)?.map((eventType, index) => (
									<FormControlLabel
										key={index}
										control={
											<Checkbox
												value={eventType.eventTypeName}
												onChange={() => handleChange(eventType.eventTypeId)}
												checked={checkedEventType.includes(eventType.eventTypeId)}
												name={eventType.eventTypeName}
												color="primary"
											/>
										}
										label={`${eventType.eventTypeName} (${eventType.count})`}
									/>
								))}
								{eventTypes?.length > 5 && !showMore &&
									<Button variant="outlined" color="primary" onClick={() => setShowMore(true)}>
										Show More
									</Button>
								}
								{eventTypes?.length > 5 && showMore &&
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
export default React.memo(TypeComponent);