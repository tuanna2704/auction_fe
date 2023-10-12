import { configureStore } from "@reduxjs/toolkit";
import userReducer from "store/user.reducer";

export interface IUserReducer {
  id: number;
  deposit: number;
  totalDepositLock: number;
  name: string;
};

export interface IStore {
  user: IUserReducer;
}

export default configureStore({
  reducer: {
    user: userReducer
  }
})
