import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reservationId: null,
    eventId: null,
    memberId: null,
    seatingIds: [],
    scheduleIds: [],
    attendees: [],
    publishReservation: false,
    comments: '',
    questionIdAndAnswerMap: {},
    stickWithPreferredTime: false,
    lotteryRequest: false,
};

const eventReservationSlice = createSlice({
    name : 'eventReservation',
    initialState,
    reducers:{
        setReservationId: (state,action) => {
            state.reservationId = action.payload;
        },
        setEventId : (state,action) => {
            state.eventId = action.payload;
        },
        setMemberId : (state,action) => {
            state.memberId = action.payload;
        },
        setSeatingIds: (state, action) => {
            state.seatingIds = action.payload;
        },
        setScheduleIds: (state, action) => {
            state.scheduleIds = action.payload;
        },
        setAttendees: (state, action) => {
            state.attendees = action.payload;
        },
        addAttendee:(state,action) => {
            console.log("Add Attendee : ",action.payload);
            state.attendees.push({
                memberId: action.payload.memberId,
                name : action.payload.name || '',
                type : action.payload.type || 1,
                itemDetail:[]
            });
        },
        removeAttendee:(state,action) => {
            // state.attendees = state.attendees.filter(attendee => attendee.memberId !== action.payload);
            const {index,memberId} = action.payload;
            console.log("Remove Attendee : ",action.payload);

            const removeByIndex = idx => {
                if(idx != -1){
                    state.attendees.splice(idx,1);
                }
            }
            if(typeof index != 'undefined' && index >= 0){
                console.log("Remove Attendee on the basis of index : ",index);
                removeByIndex(index);
            }
            
        },
        updateAttendee:(state,action) => {
            console.log("Update Attendee : ",action.payload);
            const {index ,name,type,memberId} = action.payload;
            const attendee = state.attendees[index];
            if(attendee){
                attendee.name = name;
                attendee.type = type !== undefined ? type :  attendee.type;
                attendee.memberId = memberId !== undefined ? memberId : attendee.memberId;
            }
            // state.attendees[index] = attendee;
        },
        addItemToAnAttendee:(state,action) => {
            console.log("Add Item to An attendee",action.payload);
            const {index,saleItemId,salesItemChargeId,isPriceModified,modifiedPrice,discountedAmount,totalDiscount,entireScheduleDiscount} = action.payload;
            const attendee = state.attendees[index];
            console.log("All Attendees : ",state.attendees);
            console.log("Add Item to an attendee :",attendee);
            if(attendee){
                const item = attendee.itemDetail.find(i => i.saleItemId === saleItemId );
                if(item){
                    item.quantity+=1
                }
                else{
                    attendee.itemDetail.push({
                        saleItemId,
                        quantity:1,
                        salesItemChargeId,
                        isPriceModified,
                        modifiedPrice,
                        discountedAmount,
                        totalDiscount,
                        entireScheduleDiscount
                    })
                }
            }
        },
        updateItemQuantity: (state, action) => {
            const { index, saleItemId, quantity } = action.payload;
            const attendee = state.attendees[index];
            if (attendee) {
              const item = attendee.itemDetails.find(i => i.saleItemId === saleItemId);
              if (item) {
                item.quantity = quantity;
              }
            }
          },
        setPublishReservation: (state, action) => {
            state.publishReservation = action.payload;
        },
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        setQuestionIdAndAnswerMap: (state, action) => {
            state.questionIdAndAnswerMap = action.payload;
        },
        setStickWithPreferredTime: (state, action) => {
            state.stickWithPreferredTime = action.payload;
        },
        setLotteryRequest: (state, action) => {
            state.lotteryRequest = action.payload;
        },
    }
});

export const initialEventReservationState = initialState;
export default eventReservationSlice;
