import React from 'react';
import { useSelector } from 'react-redux';
import SelectedMemberComponent from "./../SelectedMemberComponent";
const EventMembers = ({ members, onSetMembersData }) => {
	const properties = useSelector(state => state.properties.eventPortalDetailCatalogLabels);
	// onSetMembersData={onSetMembersData}
	// members?.length > 0 &&
    return (
		
			<div className="row mb-20">
				<div className="col-12">
					<h4 className="select-member mt-18">
						{properties?.selectedMembersHeading}
					</h4>
				</div>
				<div className="col-12">
					<SelectedMemberComponent selectMember={members}  />
				</div>
			</div>
		
	);
}

export default EventMembers;