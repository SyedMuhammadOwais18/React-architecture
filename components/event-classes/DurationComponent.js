import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ButtonComponent from "./ButtonComponent.js";
import { filterActions } from '../../redux-store/index.js';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles({
	root: {
		width: '100%',
	},
});
const DurationComponent = (props) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const handleChange = (event) => {
		dispatch(filterActions.getFilteredEventDuration(event.target.value));
	};
	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
					aria-label="Expand"
					aria-controls="additional-actions-content-1"
					id="additional-actions1-header-1"
				>
					<div className="display-block">
						<h3> Duration </h3>
					</div>
				</AccordionSummary>
				<AccordionDetails className="flex-direction">
					<>
						<ButtonComponent> Clear Filter </ButtonComponent>
						<FormGroup >

							{['Less than 1 Hours (24)', '1-2 Hours (36)', '2-5 Hours (25)', '6-7 Hours (32)', '7-10 Hours (11)'].map((duration, index) => (

								<FormControlLabel
									key={index}
									control={
										<Checkbox
											value={duration}
											onChange={handleChange}
											name={duration}
											color="primary"
										/>
									}
									label={duration}
								/>
							))}
						</FormGroup>
					</>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
export default React.memo(DurationComponent);