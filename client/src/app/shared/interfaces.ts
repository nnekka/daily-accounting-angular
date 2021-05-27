
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  expiresIn: number;
}

export interface Account {
  name: string;
  total: number;
  currency: Currency;
  user: string;
  _id?: string;
  createdAt: Date;
}
export enum Currency {
  rub ='rub',
  euro = 'euro',
  dollar = 'dollar'
}

export interface CurrencyData {
  name: string;
  value: number;
}

export interface ExpenditureCategory {
  name: string;
  items: string[];
}

export interface Expenditure {
  _id?: string;
  description: string;
  qty: number;
  itemPrice: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  account: string;
}

export interface GainCategory {
  _id?: string;
  items: string[];
  name: string;
}

