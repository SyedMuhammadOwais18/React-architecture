import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let memberId = Liferay.ThemeDisplay.getNsMemberId();
export const fetchInitialMember = createAsyncThunk( 'reservation/fetchInitialMember', 
    async () => {
        return new Promise((resolve,reject) =>  {
            Liferay.Service(
                '/northstar-react.classesview/get-member-by-id',
                {
                  memberId: memberId
                },
                function(obj) {
                    try{
                        let parsedObj = typeof(obj) === 'string' ? JSON.parse(obj) : obj;
                        if(parsedObj){
                            resolve(parsedObj);
                        }
                        else{
                            reject (new Error('Failed to fetch member'));
                        }
                    }
                    catch(error){
                        reject (new Error('Failed to parse api to set initial member for dynamic Guest'))
                    }
                  
                }
              );
        })
       
    }
)
const initialState = {
    dynamicGuests: [{ 
        memberId: 0, 
        value: 'owais', 
        option: 'Adult',
        totalAmount: 0,
        discountedAmount:0,
        selectedItems:[],
        index:0,
        isDependent : false
        }],
        totalAmount:0,
        discountedAmount:0,
        selectedMemberOrGuest: []
}
const reservationPanelSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        addField: (state,action) => {
            console.log("payload : ",action.payload);
            // const index = action.payload.index;
            // const memberId = action.payload.memberId;
            let value = '';
            let isDependent = false;
            let option = 'Adult';
            let memberId = 0;
            if(action.payload.memberName){
                value = action.payload.memberName;
            }
            if(action.payload.isDependent){
                isDependent = true;
            }
            if(action.payload.type){
                option = action.payload.type;
            }
            if(action.payload.memberId){
                memberId = action.payload.memberId;
            }
            state.dynamicGuests.push({
                memberId: memberId, 
                value: value, 
                option: option, 
                totalAmount: 0,
                selectedItems : [],
                // index: index,
                isDependent:isDependent
            })
        },
        removeField: (state, action) => {
                const {index} = action.payload;
                console.log("Remove Index : ",index);
                if(index !== -1 ){
                    state.dynamicGuests.splice(index,1);
                }
            return state
        },
        updateField: (state, action) => {
            const { index, option, value, memberId,isDependent} = action.payload;
            console.log("ACTION.PAYLOAD : ",action.payload);
            console.log("MEMBER ID : ",memberId);
            // if (option !== undefined) {
                state.dynamicGuests[index].option = option;
            // }
            // else {
                if(value){

                    state.dynamicGuests[index].value = value;
                }
                else{
                    state.dynamicGuests[index].value = ' ';
                }
                // if(memberId){
                //     state.dynamicGuests[index].index = memberId;
                //     state.dynamicGuests[index].memberId = memberId;
                // }
                // else{
                //     if(!isDependent){
                //         state.dynamicGuests[index].index = index;
                //     }
                // }
            // }
        },
        addSelectedMember: (state, action) => {
            state.selectedMemberOrGuest.push(action.payload);
        },
        removeSelectedMember: (state, action) => {
            const index = state.selectedMemberOrGuest.findIndex(selectedMember => selectedMember.memberId === action.payload);
            if (index !== -1) {
                state.selectedMemberOrGuest.splice(index, 1)
            }
        },
        addOrUpdateSelectedMember: (state, action) => {
            const { memberDetails, index } = action.payload;
            const existingMemberIndex = state.selectedMemberOrGuest.findIndex(
                selectedMember => selectedMember.index === index
            );

            if (existingMemberIndex !== -1) {
                state.selectedMemberOrGuest[existingMemberIndex] = memberDetails;
            } else {
                state.selectedMemberOrGuest.push({ ...memberDetails, index });
            }
        },
        updateTotalAmount:(state,action) => {
            const {index,totalAmount} = action.payload;
            state.dynamicGuests[index].totalAmount = totalAmount;
        },
        updateSelectedItem : (state,action) => {
            const {index,selectedItems} = action.payload;
            state.dynamicGuests[index].selectedItems = selectedItems;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialMember.fulfilled, (state,action) => {
            console.log("Response : ",action.payload);
            if(state.dynamicGuests.length > 0){
                state.dynamicGuests[0].memberId = action.payload.response.memberId,
                state.dynamicGuests[0].value = action.payload.response.displayName
            }
        })
    }
})

export default reservationPanelSlice;
export const initailReservationPanelState = initialState;