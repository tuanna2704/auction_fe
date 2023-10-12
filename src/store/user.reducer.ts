import { createSlice } from "@reduxjs/toolkit";
import { IStore } from "store";

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {}
});

export const {} = userSlice.actions;

export const selectUser = (state: IStore) => state.user;

export default userSlice.reducer;
