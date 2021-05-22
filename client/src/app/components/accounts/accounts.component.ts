import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../../shared/services/account.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {CurrencyData} from "../../shared/interfaces";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[]
  isPending = false
  displayedColumns: string[] = [ 'name', 'total', 'currency', 'dir', 'dop' ]
  currencies: CurrencyData[]

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.isPending = true
    this.getCurrency()
    this.accountService.accountsSubject.subscribe(
      (accounts: Account[]) => {
        if (accounts){
          this.accounts = accounts
        }
      }
    )

    this.accountService.getAccounts().subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts
        this.isPending = false
      },
      error => {
        console.log('Ошибка в компоненте accounts')
      }
    )

    this.accountService.valutesSubject.subscribe(
      (currencies: CurrencyData[]) => {
        if (currencies){
          this.currencies = currencies
        }
      }
    )
  }

  getCurrency(){
    this.accountService.getCurrencies()
      .subscribe(
        (data) => {
          console.log('Meow')

        },
        error => {
          console.log(error)
        }
      )
  }

}
