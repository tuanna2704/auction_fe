import { createSlice } from "@reduxjs/toolkit";
import { IStore } from "store";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    deposit: 0,
    totalDepositLock: 0
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    increaseDeposit: (state, action) => {
      state.deposit += action.payload;
    },
    increaseDepositLock: (state, action) => {
      state.totalDepositLock += action.payload;
    },
    resetUser: (state) => {
      return {
        deposit: 0,
        totalDepositLock: 0
      }
    },
  }
});

export const { setUser, increaseDeposit, increaseDepositLock, resetUser } = userSlice.actions;

export const selectUser = (state: IStore) => state.user;

export default userSlice.reducer;
