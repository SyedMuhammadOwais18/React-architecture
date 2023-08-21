import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		'& > * + *': {
			marginTop: theme.spacing(1),
		},
	},
}));
const RatingComponent = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Rating name="half-rating-read" defaultValue={props.value} precision={0.5} readOnly size="large" />
		</div>
	);
}
export default React.memo(RatingComponent);