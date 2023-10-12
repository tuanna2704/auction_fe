import { configureStore } from "@reduxjs/toolkit";
import userReducer from "store/user.reducer";

export interface IUserReducer {

};

export interface IStore {
  user: IUserReducer;
}

export default configureStore({
  reducer: {
    user: userReducer
  }
})
