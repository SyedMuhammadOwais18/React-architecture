import React from 'react';
import { useSelector } from 'react-redux';
import SelectedMemberComponent from '../SelectedMemberComponent';
import AddDynamicGuest from './AddDynamicGuest';

const MemberInfoWrapper = (props) => {
    const members = useSelector(state => state.members.dependents);
    return (
        <>
         {members?.length > 0 && <SelectedMemberComponent />}
         <AddDynamicGuest />
        </>
    )
}

export default MemberInfoWrapper;