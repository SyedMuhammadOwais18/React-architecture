import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
const FilterComponent = (props) => {
	const filterEventStatuses = useSelector((state) =>state.eventFilters.Statuses);
	const filterEventTypes = useSelector((state) =>state.eventFilters.Type);
	const filterEventInstructors = useSelector((state) =>state.eventFilters.Instructors);
	const filterEventCategories = useSelector((state) =>state.eventFilters.Categories);
	const filterEventDays = useSelector((state) =>state.eventFilters.Days);
	const isDateSelected = useSelector((state) =>state.eventFilters.Date[2]);
	let totalFilterSelected = filterEventStatuses.length + filterEventTypes.length + filterEventInstructors.length + filterEventCategories.length + filterEventDays.length;
	totalFilterSelected = isDateSelected ? totalFilterSelected + 1 : totalFilterSelected;

	return (
		<>
			<div className="bar-filter f-desktop" >
				<span onClick={props.onClick}>
					<FontAwesomeIcon icon={faSliders} />
					<span>Filter</span>
					<span>({totalFilterSelected})</span>
				</span>
				<span>
					{
						(
							filterEventTypes.length > 0 ||
							filterEventStatuses.length > 0 ||
							filterEventInstructors.length > 0 ||
							filterEventCategories.length > 0  ||
							filterEventDays.length > 0 ||
							isDateSelected
							
						) && <img src="/o/northstar-react-portlet/images/default-clear-all-filter-icon.png" className="m-auto img-w30" alt="image not found" onClick={props.onClearAll} />
					}
				</span>
			</div>

			<div className="bar-filter f-phone" onClick={props.onClick}>
				<FontAwesomeIcon icon={faSliders} />

			</div>
		</>
	)
}
export default React.memo(FilterComponent);