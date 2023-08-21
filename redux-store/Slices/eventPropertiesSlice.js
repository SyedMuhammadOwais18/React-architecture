import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    eventsSettings: {},
    portalReservationSettings: {},
    eventPortalBooleanProperties: {},
    reservationSettings: {},
    eventPortalLabels: {},
    eventPortalGolfLabels: {},
    eventPortalDetailCatalogLabels: {},
    memberPrivileges: {},
}
const propertiesSlice = createSlice({
    name : 'properties',
    initialState,
    reducers:{
        setProperties:(state,action) =>{
            return {...state , ...action.payload}
        },
    },
});

export const {setProperties} = propertiesSlice.actions;
export default propertiesSlice;