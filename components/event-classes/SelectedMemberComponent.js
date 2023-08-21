import React, { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../Hooks/useHttp.js';
import { eventReservationActions, memberActions, reservationPanelActions } from '../../redux-store/index.js';
import { addAttendeeAndItem } from '../../redux-store/middleware/eventReservationThunk.js';

const SelectedMemberComponent = () => {
	// { selectMember, onSetMembersData }
	// onSetMembersData={onSetMembersData}
	const selectMember = useSelector(state => state.members.dependents);
	console.log("Select Member Component : ",selectMember);
	const memoizedMembers = useMemo(() => Array.from(selectMember), [selectMember]);
	console.log("Memoized Member : ",memoizedMembers);
	return (
		<>	
			{memoizedMembers.map((activeMember, i) => (
				<MemberComponent activeMember={activeMember} key={i} />
			))}
			
		</>
	);
}

const MemberComponent = ({ activeMember}) => {
	console.log("Mmeber : ",activeMember);
	// const [isTick, setIsTick] = useState(false);
	const dispatch = useDispatch();
	const {sendRequest} = useHttp();
	// const selectMemberIds = useSelector(state => state?.members?.selectedMemberIds);
	// const isExist = selectMemberIds.includes(activeMember.memberId);
	let fields = useSelector(state => state?.reservation.dynamicGuests);
	const isExist = fields.some((field) => field.memberId === activeMember.memberId);
	console.log("Is Exist : ",isExist);
	let determineIndexForDependent = fields.findIndex(field => field.memberId === activeMember.memberId);
	console.log("Dependent length",determineIndexForDependent);
	const saleItems = useSelector(state => state.eventDetails.event.salesItems);
    const retrieveDefaultSalesItemForDefaultAttendee = saleItems?.filter(saleItem => saleItem?.headCount)
	// let checkedMember = useSelector(state => state.eventReservation.attendees);
	// let Exist = checkedMember.includes(activeMember.memberId);
	// console.log("Exist : ",Exist);

	const toggleTick = useCallback(() => {
		// dispatch(memberActions.selectMemberIds(activeMember.memberId));
		if(!isExist){
			// dispatch(reservationPanelActions.addSelectedMember(activeMember));
			// dispatch(memberActions?.selectMemberIds(activeMember?.memberId));
			sendRequest({
				 url:'/northstar-react.classesview/get-member-by-id',
					params:{memberId:activeMember.memberId},
					method:'GET'
			},(memberDetails) => {
				console.log("Member Details : ",memberDetails);
				
				dispatch(reservationPanelActions?.addField({memberId :memberDetails?.response?.memberId, memberName:memberDetails?.response?.displayName,isDependent:true}))
				const attendee = {
					memberId:memberDetails?.response?.memberId,
					name : memberDetails?.response?.displayName,
					type : 1
				}

				let defaultSelectedItem ={
					saleItemId:retrieveDefaultSalesItemForDefaultAttendee[0]?.saleItemId,
					quantity:1,
					salesItemChargeId:retrieveDefaultSalesItemForDefaultAttendee[0]?.saleItemId+1,
					isPriceModified:false,
					modifiedPrice:0.0,
					discountedAmount:0.0,
					totalDiscount:0.0,
					entireScheduleDiscount:false,
					}
				// dispatch(eventReservationActions.addAttendee(attendee,defaultSelectedItem,determineIndexForDependent));
				dispatch(addAttendeeAndItem(attendee,defaultSelectedItem,determineIndexForDependent));
				// add item deatil to an attendee
			})
			// dispatch(reservationPanelActions?.addOrUpdateSelectedMember({
			// 	memberDetails:activeMember,
			// 	index:activeMember.memberId
			// }))
			
		}
		else{
			dispatch(reservationPanelActions?.removeField({index:determineIndexForDependent}));
			// dispatch(eventReservationActions.removeAttendee({memberId:activeMember.memberId}));
			dispatch(eventReservationActions.removeAttendee({index:determineIndexForDependent}));
			dispatch(memberActions?.selectMemberIds(activeMember.memberId));
		}
		
	  }, [dispatch, activeMember.memberId,isExist]);

	return (
		<span className={`${isExist ? 'selected-member-inner' : 'member-button-inner'}`} onClick={toggleTick} data-member-id={activeMember.memberId}>
			<img src={`data:image/png;base64,${activeMember.pictureImageBase64DataURI}`} className="member-icon" />
			<span className="level1">{`${activeMember.firstName} ${activeMember.lastName}`}</span>
			<br />
		</span>
	);
}

export default SelectedMemberComponent;