import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {AccountService} from "./shared/services/account.service";
import {Account, Currency, CurrencyData} from "./shared/interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  accounts: Account[]
  currencies: any

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ){}

  ngOnInit(): void {
    this.authService.authorization()
    this.accountService.getCurrencies()
      .subscribe(
        (currencies: any) => {
          this.currencies = currencies
        }
      )
    this.accountService.getAccounts()
      .subscribe(
        (accounts: Account[]) => {
          this.accounts = accounts
          this.accountService.accountsSubject.next(accounts)
        }
      )
  }
}
