import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import RatingComponent from "./RatingComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	abc: {
		display: 'flex',
		alignItems: 'center',
		padding: '10px',
		lineHeight: 'normal',
	}
});
const RatingsComponent = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState('5');
	const handleChange = (event) => {
		setValue(event.target.value);
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
					<h3> Ratings </h3>
				</AccordionSummary>
				<AccordionDetails>
					<RadioGroup aria-label="rating" name="rating1" value={value} onChange={handleChange}>
						<span className={classes.abc}>
							<FormControlLabel value="5" control={<Radio color="primary" />} />
							<RatingComponent value={5} />
							<span className="rating-text">(5)</span>
						</span>
						<span className={classes.abc}>
							<FormControlLabel value="4" control={<Radio color="primary" />} />
							<RatingComponent value={4} />
							<span className="rating-text">(4)</span>
						</span>
						<span className={classes.abc}>
							<FormControlLabel value="3" control={<Radio color="primary" />} />
							<RatingComponent value={3} />
							<span className="rating-text">(3)</span>
						</span>
						<span className={classes.abc}>
							<FormControlLabel value="2" control={<Radio color="primary" />} />
							<RatingComponent value={2} />
							<span className="rating-text">(2)</span>
						</span>
						<span className={classes.abc}>
							<FormControlLabel value="1" control={<Radio color="primary" />} />
							<RatingComponent value={1} />
							<span className="rating-text">(1)</span>
						</span>
					</RadioGroup>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
export default React.memo(RatingsComponent);
