import { eventReservationActions} from "../index.js";

export const addAttendeeAndItem = (attendee, defaultSelectedItem,index) => (dispatch, getState) => {
    dispatch(eventReservationActions.addAttendee(attendee));
    
    // Get the updated state after adding the attendee
    const updatedState = getState().eventReservation; // Adjust if your slice name in rootReducer is different
    console.log("Updated State",updatedState);
    if (index >= 0) {
        const payload = {
            ...defaultSelectedItem,
            index: index
        };

        dispatch(eventReservationActions.addItemToAnAttendee(payload));
    }
};



