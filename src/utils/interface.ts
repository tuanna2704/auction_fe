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

export interface IDepositLock {
  id: number;
  amount: number;
}

export interface IBiddingItem {
  id: number;
  userId: number;
  startPrice: number;
  name: string;
  state: BiddingItemStateType;
  startTime: string;
  endTime: string;
  depositLock: IDepositLock[];
}

export type BiddingItemStateType = 'PUBLISHED' | 'DRAFT';