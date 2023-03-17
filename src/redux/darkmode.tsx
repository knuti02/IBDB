import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const darkmode = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    setDarkmode: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDarkmode } = darkmode.actions;

export default darkmode.reducer;
