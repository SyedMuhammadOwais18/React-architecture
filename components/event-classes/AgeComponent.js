import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ButtonComponent from "./ButtonComponent.js";
import { filterActions } from '../../redux-store/index';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const AgeComponent = (props) => {
	const [expand, setExpand] = React.useState(true);
	const dispatch = useDispatch();
	const handleChange = (event) => {
		dispatch(filterActions.getFilteredEventAge(event.target.value));
	};
	const toggleAccordion = () => {
		setExpand((prev) => !prev);
	};
	return (
		<div className="course-sidebar-widget">
			<Accordion expanded={expand} onChange={toggleAccordion}>
				<AccordionSummary
					expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
					aria-label="Expand"
					aria-controls="additional-actions-content-1"
					id="additional-actions-header-1"
				>
					<div className="display-block">
						<h3> Age </h3>
					</div>
				</AccordionSummary>
				<AccordionDetails className="flex-direction">
					<>
						<ButtonComponent> Clear Filter </ButtonComponent>
						<FormGroup >

							{['1-10 (5)', '11-20 (36)', '21-30 (44)', '31-40 (8)', '41-50 (15)'].map((age, index) => (

								<FormControlLabel
									key={index}
									control={
										<Checkbox
											value={age}
											onChange={handleChange}
											name={age}
											color="primary"
										/>
									}
									label={age}
								/>
							))}
						</FormGroup>
					</>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
export default React.memo(AgeComponent);