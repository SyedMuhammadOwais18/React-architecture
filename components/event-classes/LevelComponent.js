import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const LevelComponent = (props) => {
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
		checkedC: true,
		checkedD: true,
		checkedE: true,
	});
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<div className="course-sidebar-widget">
			<Accordion>
				<AccordionSummary
					expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
					aria-label="Expand"
					aria-controls="additional-actions1-content"
					id="additional-actions1-header"
				>
					<h3> Level </h3>
				</AccordionSummary>
				<AccordionDetails>
					<FormGroup >
						<FormControlLabel
							control={
								<Checkbox
									checked={state.checkedA}
									onChange={handleChange}
									name="checkedA"
									color="primary"
								/>
							}
							label="All levels (5)"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.checkedB}
									onChange={handleChange}
									name="checkedB"
									color="primary"
								/>
							}
							label="Beginner (36)"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.checkedC}
									onChange={handleChange}
									name="checkedC"
									color="primary"
								/>
							}
							label="Intermediate (25)"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={state.checkedD}
									onChange={handleChange}
									name="checkedD"
									color="primary"
								/>
							}
							label="Expert (32)"
						/>
					</FormGroup>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
export default React.memo(LevelComponent);