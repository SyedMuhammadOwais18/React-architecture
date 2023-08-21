import React, { useState } from "react";
import { SelectComponentData } from '../../Data/SelectComponentData';
let Selectoption = [];
const SelectFilterComponent = (props) => {
	const [open, setOpen] = useState(false);
	const openSelectHandler = () => {
		setOpen((prevState) => !prevState);
	}
	const selectValueHandler = (selectedFilter) => {
		Selectoption = [];
		Selectoption.push(selectedFilter);
	}
	const closeSelectHandler = () => {
		setOpen(false);
	}
	return (
		<div>
			<div className="couse-dropdown" >
				<div className="course-drop-inner">
					<div className={`nice-select ${open ? 'open' : ''}`} tabIndex="0" onClick={openSelectHandler} onBlur={closeSelectHandler}>
						<span className="current">{Selectoption.length == 0 ? 'Mostly Viewed' : Selectoption[Selectoption.length - 1]} </span>
						<ul className="list">
							{SelectComponentData.map((option, index) => (
								<li key={index} className={`option ${option.name == Selectoption[0] ? 'selected' : ''}`} onClick={() => selectValueHandler(option.name)}>{option.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
export default React.memo(SelectFilterComponent);