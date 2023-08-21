import React, { useState, useContext, useEffect } from "react";
import  makeStyles  from '@material-ui/core/styles/makeStyles';
import Pagination from '@material-ui/lab/Pagination';
import EventContext from "../../store/event-classes/event-context";
import { useFilter } from "../../store/event-classes/filter-context.js";
const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2),
		},
	},
}));
const PaginationComponent = (props) => {
	const eventCtx = useContext(EventContext);
	let PageSize = parseInt(eventCtx.paginationCount);
	const classes1 = useStyles();
	const [page, setPage] = useState(1);
	const { state, filterDispatch } = useFilter();
	const handlePageChange = (event, value) => {
		setPage(value);
		props.onPageChange(value);
	};
	//Pagination Logic to show three cards at a time
	//passing data to the home screen using filterData props
	if (page > 1 && props.data.slice((page - 1) * PageSize, (page - 1) * PageSize + PageSize).length === 0) {
		setPage(1);
	}
	useEffect(() => {
		const firstPageIndex = (page - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		const checkIfEventExist = props?.data?.filter((d) => Date.parse(d.startDate) <= Date.parse(state.date) && Date.parse(state.date) <= Date.parse(d.endDate))
		if (state.date === "") {
			filterDispatch({
				type: 'FILTER_PAGINATION_WITHOUTDATE',
				payload: props?.data?.slice(firstPageIndex, lastPageIndex)
			})
		}
		else if (checkIfEventExist?.length > 0 && state.date != "") {
			filterDispatch({
				type: 'FILTER_PAGINATION_DATE',
				payload: props?.data?.slice(firstPageIndex, lastPageIndex)
			})
		}
		else if (checkIfEventExist.length === 0 || state.date !== "") {
			filterDispatch({
				type: 'FILTER_DATA_NOT_EXIST',
				payload: []
			})
		}



		filterDispatch(({
			type: 'TOTAL_DATA_COUNT',
			payload: (props?.data?.slice(firstPageIndex, lastPageIndex)?.length) + firstPageIndex
		}))
	}, [page, state.date, JSON.stringify(props.data), state?.filterDays.length])
	let totalCount = props.data.length;
	let pageCount = Math.ceil(totalCount / PageSize);
	return (
		<div className="row home-pagination">
			<div className={classes1.root}>
				<Pagination count={pageCount} color="primary" page={page} onChange={handlePageChange} />
			</div>
		</div>
	);
}
export default PaginationComponent;