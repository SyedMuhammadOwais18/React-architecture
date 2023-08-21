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
const CategoriesComponent = (props) => {
	const dispatch = useDispatch();
	const categoriesFilters = useSelector((state) => state.eventFilters.filterData.Categories);
	const checkedEventCategoriesFilters = useSelector((state) => state.eventFilters.Categories);
	const [showMore, setShowMore] = useState(false);
	const [expand, setExpand] = useState(true);
	const toggleAccordion = () => {
		setExpand((prev) => !prev);
	};
	const handleChange = (filterId) => {

		dispatch(filterActions.getFilteredEventCategories(filterId));
	};
	const clearEventInstructor = (event) => {

		dispatch(filterActions.clearFilteredEventCategories());
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
						<h3> Categories </h3>
						{checkedEventCategoriesFilters.length > 0 && <img src="/o/northstar-react-portlet/images/default-clear-single-filter-icon.png" className="m-auto" alt="image not found" onClick={clearEventInstructor} />}
					</div>
				</AccordionSummary>
				<AccordionDetails className="flex-direction">
					<>

						<FormGroup >
							<>
								{categoriesFilters?.slice(0, 5)?.map((categoryFilter, index) => (

									<FormControlLabel
										key={index}
										control={
											<Checkbox
												value={categoryFilter.filterName}
												checked={checkedEventCategoriesFilters.includes(categoryFilter.filterId)}
												onChange={() => handleChange(categoryFilter.filterId)}
												name={categoryFilter.filterName}
												color="primary"
											/>
										}
										label={<>{categoryFilter.filterName} ({categoryFilter.count}) <span className={`color-box events-advancelisting-eventTrainer-${categoryFilter.filterName?.replace(/\s/g, "")}`}></span> </>}

									/>




								))}
								{showMore && categoriesFilters?.slice(5)?.map((categoryFilter, index) => (

									<FormControlLabel
										key={index}
										control={
											<Checkbox
											value={categoryFilter.filterName}
											checked={checkedEventCategoriesFilters.includes(categoryFilter.filterId)}
											onChange={() => handleChange(categoryFilter.filterId)}
											name={categoryFilter.filterName}
											color="primary"
											/>
										}
										label={<>{categoryFilter.filterName} ({categoryFilter.count}) <span className={`color-box events-advancelisting-eventTrainer-${categoryFilter?.filterName?.replace(/\s/g, "")}`}></span> </>}
									/>


								))}
								{categoriesFilters?.length > 5 && !showMore &&
									<Button variant="outlined" color="primary" onClick={() => setShowMore(true)}>
										Show More
									</Button>
								}
								{categoriesFilters?.length > 5 && showMore &&
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
export default React.memo(CategoriesComponent);