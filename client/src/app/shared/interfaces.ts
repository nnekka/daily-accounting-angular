
export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  expiresIn: number;
}

export interface Account {
  name: string;
  total: number;
  currency: Currency;
  lastDayTotal: number,
  user: string;
  id?: string;
  createdAt: Date;
}
export enum Currency {
  rub ='rub',
  euro = 'euro',
  dollar = 'dollar'
}
