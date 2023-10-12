export interface IRegisterUser {
  email: string;
  name: string;
  password: string;
}

export interface ICreateBiddingItemInput {
  name: string;
  startPrice: number;
  startTime: string;
  endTime: string;
  state: BiddingItemStateType;
}

export interface IBiddingItem {
  id: number;
  startPrice: number;
  name: string;
  state: BiddingItemStateType;
  startTime: string;
  endTime: string;
}

export type BiddingItemStateType = 'PUBLISHED' | 'DRAFT';