import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccordionComponent from "./AccordionComponent.js";
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AccordionData } from '../../Data/AccordionData';
const DrawerComponent = (props) => {
	return (
		<>
			<div className="cartmini__close">
				<button type="button" className="cartmini__close-btn cart-toggle-btn2" onClick={props.onClose}><FontAwesomeIcon icon={faTimes} className="drawer-close-button" /></button>
			</div>
			<div className="row justify-content-center mt-10">
				<div className="col-12 pr-20 pl-20">
					<div className="col-12">
						<span className="btn btn-success btn-custom-font finalize-button" >
							<FontAwesomeIcon icon={faCheck} className="mr-10" />Finalize
						</span>
						<span className="btn btn-primary btn-custom-font" >
							Reservation List
						</span>
					</div>
					<AccordionComponent data={AccordionData} eventDetail = {props.eventDetail} members={props.members} onSetMembersData={props.onSetMembersData}/>
				</div>
			</div>
		</>
	)
}
export default DrawerComponent;