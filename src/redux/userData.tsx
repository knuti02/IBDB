import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

const initialState = {
  value: undefined,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    removeUserData: (state) => {
      state.value = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeUserData, setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
