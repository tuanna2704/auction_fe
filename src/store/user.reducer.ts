import { createSlice } from "@reduxjs/toolkit";
import { IStore } from "store";

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: IStore) => state.user;

export default userSlice.reducer;
