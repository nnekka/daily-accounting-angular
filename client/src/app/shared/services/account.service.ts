import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  accountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([])
  accounts: Account[]



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

}
