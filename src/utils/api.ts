import axios from "axios";
import { IRegisterUser } from "utils/interface";

const headers  = {
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
};
export const registerUser = async (values: IRegisterUser) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/signup`, {user: values});

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const signIn = async (values: IRegisterUser) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/signin`, {user: values});

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const getUserInfo = async () => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/info`, {}, {
      headers
    });

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}