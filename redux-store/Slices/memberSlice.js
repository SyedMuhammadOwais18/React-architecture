import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    members:[],
    dependents : [],
    selectedMemberIds:[],
    selectedDependentssOrGuests:[],
    isAdmin:false
}
const memberSlice = createSlice({
    name : 'members',
    initialState,
    reducers:{
        getMembersList: (state,action) => {
            state.members = action.payload;
        },
        getDependents : (state,action) => {
            state.dependents = action.payload;
        },
        selectMemberIds : (state,action) => {
            const id = action.payload;
            const exist = state.selectedMemberIds.includes(id);
            if(!exist){
                state.selectedMemberIds.push(id);
            }
            else{
                state.selectedMemberIds.splice(state.selectedMemberIds.indexOf(id),1);
            }
        },
    }
});

export const initialMemberState = initialState;
export default memberSlice;