import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../../Hooks/useHttp';
import { eventReservationActions, memberActions, reservationPanelActions } from '../../../redux-store/index.js';
let isPrev = false;
const AutoComplete = ({ value, index, type, onInputChange,currentUser }) => {
    console.log("Index : ",index);
    console.log("Value : ",value);
    console.log("AutoComplete Current User : ",currentUser);
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(false);
    const { error, loading, sendRequest } = useHttp();
    const dispatch = useDispatch();
    const eventDetail = useSelector(state => state.eventDetails.event);
    const memberId = Liferay.ThemeDisplay.getNsMemberId();
    const members = useSelector(state => state.members.members);
    const isAdmin = useSelector(state => state.members.isAdmin);
    const [selectedFromList,setSelectedFromList] = useState(false);
    const [inputValue , setInputValue] = useState(value);
    console.log("Input Value : ",inputValue);
    // let type = type == 1 ? 'Adult ': 'Child';
    let getEventMember = {
        query: "",
        numberOfRecords: 50,
        memberId: memberId,
        eventId: eventDetail.eventId,
        siteId: eventDetail.siteId,

    }

    const getMembers = (members) => {
        dispatch(memberActions.getMembersList(members?.response));
    }

    const selectMember = (member,event) => {
        console.log("Member : ",member);
        event.preventDefault();
        console.log("Type : ",type );
        let updatedMemberName = type == 'Adult' ? member.displayName : member.displayName+=' Child';
        const attendee = {
            memberId: member.memberId,
            name:updatedMemberName,
            type: type == 'Adult' ? 1: 2,
            index:index
        }
        dispatch(eventReservationActions.updateAttendee(attendee));
        onInputChange(index, {
            target: {
                value: member.displayName,
                member: member.memberId,
                type:type
            }
        });
        setResults([]);
        setSelected(true);
        setSelectedFromList(true);
    }

    const handleInputChange = (e) => {
        console.log("handleInputChange : ",e.target.value);
        setInputValue(e.target.value);
        setSelectedFromList(false);
        
    }

    const handleBlur = () => {
        console.log("Inside a handleBlur function");
            let name = inputValue;
            console.log("type:",type);
            if(name == ''){
                dispatch(eventReservationActions.removeAttendee({index:index}));
            }
            if(!selectedFromList){
                console.log("NAME :",name);
                if(type === 'Child' && !name.includes(" Child Guest")){
                    // name = name !== currentUser?.displayName ? `${inputValue} Guest Child` : name.includes("ChildcurrentUser?.displayName;
                    if(name !== ''){
                        name+=" Child Guest";
                    }

                    onInputChange(index,{
                        target : {
                            value : name,
                            // memberId : name !== currentUser?.displayName ? -1 : currentUser.memberId
                            memberId : -1
                        }
                    })
                }
                else if(type === 'Adult' && !name.includes(" Guest")) {
                    // name = name !== currentUser?.displayName ? `${inputValue} Guest`: currentUser?.displayName;
                    if(name !== ''){
                        name+= " Guest"
                    }
                    onInputChange(index,{
                        target:{
                            value : name,
                            // memberId: name !== currentUser?.displayName ? -1 : currentUser.memberId
                            memberId:-1
                        }
                    })
                }
            }
            setInputValue(name);
        
    }

    useEffect(() => {
        if(value !== ''){

            setInputValue(value);
        }
    },[type,value])
    useEffect(() => {
        //fetch members from backend
        if (!isAdmin) {
            sendRequest({
                url: '/northstar-react.classesview/search-dependent-members',
                body: getEventMember,
                method: 'POST'

            }, getMembers);
        }
    }, [])

    useEffect(() => {
        if (inputValue === '') {
            console.log("RESULTS : ",inputValue);
            setResults([]);
            setSelected(false);
            // dispatch(reservationPanelActions.removeSelectedMember(index));
            return
        }
        console.log("Members : ",members);
        console.log("inputValue : ",inputValue);
        const filteredMembers = members.filter((member) => (
            member.displayName.toLowerCase().includes(inputValue.toLowerCase()) && member.displayName !== inputValue
        ))
        setResults(filteredMembers);
        setSelected(false);

    }, [inputValue, members, selected]);
    // 
    return (
        <div className="col-4 pl-0 pr-0 ml-0">Guest/Member
            <input type="text" id="searchGuest" className='guest-input w-100' value={inputValue} onChange={handleInputChange} autoComplete = 'off' onBlur= {handleBlur} />
            {!selected && results?.length > 0 && (
                <div className='autocomplete-items'>
                    {results?.map((result, index) => (
                        <p key={index} onMouseDown={(event) => selectMember(result,event)}>{result?.displayName}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
// onChange={(e) => onInputChange(index, e)}
export default AutoComplete;