import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {tap} from "rxjs/operators";
import {Currency, CurrencyData} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  accountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([])
  accounts: Account[]
  currencies: CurrencyData[] = []
  valutesSubject: BehaviorSubject<CurrencyData[]> = new BehaviorSubject<CurrencyData[]>([])



  constructor(
    private http: HttpClient
  ) {}

  getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>('/api/accounts')
      .pipe(
        tap(
          (accounts: Account[]) => {
            this.accounts = accounts
            this.accountsSubject.next(this.accounts)
          }
        )
      )
  }

  getValutesArray(){
    return this.currencies
  }

  getAccountById(id: string): Observable<Account>{
    return this.http.get<Account>(`/api/accounts/${id}`)
  }

  getCurrencies(): Observable<any>{
    return this.http.get<any>('/api/currency')
      .pipe(
        tap(
          (data) => {
            const dollar = {
              name: 'dollar',
              value: data.rates.Valute.USD.Value
            }
            const euro = {
              name: 'euro',
              value: data.rates.Valute.EUR.Value
            }
            this.currencies.push(dollar)
            this.currencies.push(euro)
            this.valutesSubject.next(this.currencies)
          }
        )
      )
  }

  createAccount(name: string, total: number, currency: string): Observable<any>{
    return this.http.post<any>('/api/accounts', {name, total, currency})
  }

  editAccountName(name: string, accountId: string): Observable<any>{
    return this.http.put(`/api/accounts/${accountId}/name`, {name})
  }

  deleteAccount(id: string): Observable<any>{
    return this.http.delete(`/api/accounts/${id}`)
  }


}
