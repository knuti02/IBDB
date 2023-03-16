import {createSlice, PayloadAction, Reducer} from '@reduxjs/toolkit';
import {ItemData} from '../types/types';

interface UserDataState {
  value: Array<ItemData> | undefined;
}

const initialState: UserDataState = {
  value: undefined,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserItems: (state, action: PayloadAction<Array<ItemData>>) => {
      state.value = action.payload;
    },
    removeUserItems: state => {
      state.value = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {removeUserItems, setUserItems} = userDataSlice.actions;

export default userDataSlice.reducer;
