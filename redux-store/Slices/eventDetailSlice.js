import { createSlice } from '@reduxjs/toolkit';

const initialEventDetailsState = {
  event: [],
  isLoading: false,
  error: null,
};

const eventDetailSlice = createSlice({
  name: 'event-details',
  initialState: initialEventDetailsState,
  reducers: {
    getEventDetailStart(state, action) {
      state.isLoading = true;
      state.error = false;
    },
    getEventDetailSuccess(state, action) {
      state.isLoading = false;
      state.event = action.payload;
    },
    getEventDetailFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default eventDetailSlice;