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
  state: 'PUBLISHED' | 'DRAFT';
}

export type BiddingItemStateType = 'PUBLISHED' | 'DRAFT';