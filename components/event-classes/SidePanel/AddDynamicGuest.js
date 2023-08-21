
import { FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../../Hooks/useHttp.js';
import { eventReservationActions, memberActions, reservationPanelActions } from '../../../redux-store/index.js';
import { addAttendeeAndItem } from '../../../redux-store/middleware/eventReservationThunk.js';
import { fetchInitialMember } from '../../../redux-store/Slices/eventReservationPanelSlice.js';
import DynamicGuestRow from './DynamicGuestRow.js';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    menuPaper: {
        backgroundColor: "#fff",
        borderRadius: "5px",
        boxShadow: "0 0 0 1px rgba(68, 68, 68, 0.11)",
        boxSizing: "border-box",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        top: "100%",
        left: "0",
        transformOrigin: "50% 0",
        transform: "scale(0.75) translateY(-21px)",
        transition: "all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out",
        zIndex: 9,
    },
    select: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: 'solid 1px #e8e8e8',
        boxSizing: 'border-box',
        clear: 'both',
        cursor: 'pointer',
        display: 'block',
        fontFamily: 'inherit',
        fontSize: '14px',
        fontWeight: 'normal',
        height: '42px',
        lineHeight: '31px',
        outline: '0',
        paddingLeft: '18px',
        paddingRight: '30px',
        position: 'relative',
        textAlign: 'left',
        width: '50%',
        transition: 'all .2s ease-in-out',
        "&:focus": {
            borderRadius: 5,
            border: "1px solid #e8e8e8",
            backgroundColor: "#fff",
        },
    },
    input: {
        '&:focus': {
            border: 'none',
            outline: 'none',
            background: 'none'
        }
    },
}));

const AddDynamicGuest = () => {
    const fields = useSelector(state => state.reservation.dynamicGuests);
    console.log("Fields : ",fields);
    const attendees = useSelector(state => state.eventReservation.attendees);
    const saleItems = useSelector(state => state.eventDetails.event.salesItems);
    const retrieveDefaultSalesItemForDefaultAttendee = saleItems?.filter(saleItem => saleItem?.headCount)
    console.log("DEFAULT SALE ITEMS : ",retrieveDefaultSalesItemForDefaultAttendee);
    // const retrieveSalesItemChargeId = retrieveDefaultSalesItemForDefaultAttendee[0].salesItemCharge.map((saleItemCharge))
    const dispatch = useDispatch();
    const classes = useStyles();
    const {error,isLoading,sendRequest} = useHttp();
    const[currentMember,setCurrentMember] = useState();
    useEffect(() => {
        sendRequest({
            url:'/northstar-react.classesview/get-member-by-id',
            params:{memberId:Liferay.ThemeDisplay.getNsMemberId()},
            method:'GET'
        },(loggedInMember) =>  {
            console.log("Current Logged In Member :",loggedInMember?.response);
            setCurrentMember(loggedInMember?.response);
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
            let attendee = {
                memberId : loggedInMember?.response?.memberId,
                name:loggedInMember?.response?.displayName,
                type: 1,
            }
            // const index = fields.length - 1;
            // let updateFirstField = {
            //     index : index,
            //     option:'Adult',
            //     value : loggedInMember?.response?.displayName,
            // }
            console.log("Attendee : ",attendee);
            // dispatch(eventReservationActions.addAttendee(attendee));
            // dispatch(eventReservationActions.addItemToAnAttendee(defaultSelectedItem));
            //add item detail to attendee
            dispatch(addAttendeeAndItem(attendee,defaultSelectedItem,0));
            // dispatch(reservationPanelActions.updateField(updateFirstField))
        })
    },[])

    useEffect(() => {
        dispatch(fetchInitialMember())
    },[dispatch])

    const handleInput = (index, event) => {
        console.log("Inside Handle Input")
        console.log("event : ",event.target);
        const payload = { index };
        if (event.target.name === 'type') {
            payload.option = event.target.value;  
            let type = event.target.value == 'Child' ? 2 : 1;
            // let currentName = fields[index].value;
            let currentName1 = attendees[index].name;
            console.log("Current Name 1 : ",currentName1);
            if(event.target.value === 'Child' && !currentName1.includes(" Child")){
                if(currentName1.includes(" Guest")){
                    currentName1 = currentName1.replace(" Guest", " Child Guest");
                }
                else{
                    currentName1 += ' Child';
                }
            }
            else if(event.target.value === 'Adult' && currentName1.includes(" Child Guest")) {
                currentName1 = currentName1.replace(" Child Guest", " Guest"); // Remove Child when switching back to Adult
            }
            else if(event.target.value === 'Adult' && currentName1.includes(" Child")){
                currentName1 = currentName1.replace(" Child", "");
            }
            dispatch(eventReservationActions.updateAttendee({ index, type: type,name:currentName1,memberId:event.target.memberId}));

            //update item for an attendee
            payload.value = currentName1;    
        }   
        else{
                let updatedName = event.target.value;
                console.log("Updated Name : ",updatedName);
                if(event.target.memberId){
                    payload.memberId = event.target.memberId;
                }
                if(event.target.type == 'Child'){
                    updatedName = updatedName.includes(" Child") ? updatedName : updatedName+=' Child';
                }  
                let memberId = event.target.memberId;
                dispatch(eventReservationActions.updateAttendee({ index,name:updatedName,memberId:memberId }));
                // update item for attendee
                payload.value = updatedName;
                // payload.index = index;
                payload.option = fields[index].option;
            }
        // payload.isDependent = fields[index].isDependent;
        
        console.log("Payload : ", payload);
        dispatch(reservationPanelActions.updateField(payload))
    }
    const handleRemoveFields = (memberId, index) => {
        console.log("Remove Field memberId : ", memberId);
        console.log("Remove Field index :",index);
        
        // if (memberId) {
        //     dispatch(reservationPanelActions.removeField({ index: memberId }));
        //     dispatch(memberActions.selectMemberIds(memberId));
        // }
        // else {
        //     dispatch(reservationPanelActions.removeField({ index: index }));
        // }
        dispatch(reservationPanelActions.removeField({ index: index }));
        dispatch(eventReservationActions.removeAttendee({index:index}));
        // if(memberId){
        //     dispatch(memberActions.selectMemberIds(memberId));
        // }
    }

    const handleAddFields = (index) => {
        // const lastField = fields[fields.length - 1];
        let newValue = currentMember;
        let type = 'Adult';
        // const existingUserField = fields.find(field => field.value === 'owais')
        const existingUser = fields.find(field => field.isDependent === false);    
        console.log("existing User : ",existingUser);    
        // if(existingUserField){
        //     newValue += ' -Guest';
        // }
        if(existingUser){
            console.log("Existing User : ",existingUser);
            if(existingUser.option == 'Child'){
                console.log(" Inside Child Option")
                if(existingUser.value.includes(' Child')){
                    if(existingUser.value.includes('Child Guest')){
                        newValue = existingUser.value;
                    }
                    else{
                        newValue  = existingUser.value.replace(' Child' , " Child Guest");
                 }
                }
                else{
                    newValue = existingUser.value += ' Child Guest';
                }
                type ='Child';
            }
            else{
                if(!existingUser.value.includes(' Guest')){
                    newValue = existingUser.value += '  Guest';
                }
                else{
                    newValue = existingUser.value;
                }
                type = 'Adult';
            }
        }
        let attendee = {
            memberId:-1,
            name : newValue,
            type:type == 'Adult' ? 1 : 2
        }
        // , index: index + 1 
        dispatch(reservationPanelActions.addField({memberId:-1,memberName : newValue,type : type, isDependent:false}))
        dispatch(eventReservationActions.addAttendee(attendee))
    }

    return (
        <>
            {fields.map((field, index) => (
                <DynamicGuestRow
                    key = {index}
                    field={field}
                    index={index}
                    classes={classes}
                    onRemove={handleRemoveFields}
                    onAdd={handleAddFields}
                    onInput={handleInput}
                    currentUser = {currentMember}
                />
                
            ))}
        </>


    );
}

export default AddDynamicGuest;