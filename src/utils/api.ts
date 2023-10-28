import axios from "axios";
import { IRegisterUser, ICreateBiddingItemInput } from "utils/interface";
import { formatDate } from "./caculate";

const headers  = () => ({
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
});

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

export const signInWithGoogle = async (credential?: string) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/google-signin`, { credential });

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const getUserInfo = async () => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/info`, {}, {
      headers: headers()
    });

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const addDeposit = async (amount: number) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/bidding/recharge`,
      { amount },
      { headers: headers() }
    );

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const createBiddingItem = async (createItemInput: ICreateBiddingItemInput) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/bidding/item/create`,
      { item: createItemInput },
      { headers: headers() }
    );

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const getBiddingItems = async (type: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/bidding/item/${type}?endTime=${formatDate(new Date())}`,
      { headers: headers() }
    );

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const bid = async (itemId: number, amount: number) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/bidding/create`,
      { itemId, amount },
      { headers: headers() }
    );

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export const finishBidding = async (itemId: number) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/bidding/finish`,
      { itemId },
      { headers: headers() }
    );

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
