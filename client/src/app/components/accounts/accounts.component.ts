import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../../shared/services/account.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {CurrencyData} from "../../shared/interfaces";
import {ErrorComponent} from "../error/error.component";
import {MatDialog} from "@angular/material/dialog";
import {Account} from "../../shared/interfaces";
import {MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[]
  isPending = false
  displayedColumns: string[] = [ 'name', 'total', 'currency', 'dir', 'dop', 'edit', 'delete' ]
  currencies: CurrencyData[]

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
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

    this.refresh()


    this.accountService.valutesSubject.subscribe(
      (currencies: CurrencyData[]) => {
        if (currencies){
          this.currencies = currencies
        }
      }
    )
  }

  refresh(){
    this.accountService.getAccounts().subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts
        this.isPending = false
      }
    )
  }

  getCurrency(){
    this.accountService.getCurrencies()
      .subscribe(
        (data) => {
          console.log('Meow')
        }
      )
  }

  onDeleteAccount(id: string){
    if (window.confirm('Вы точно хотите удалить этот счет?')){
      this.accountService.deleteAccount(id)
        .subscribe(
          (response) => {
            if (response.errors){
              this.dialog.open(ErrorComponent, {data: {message: response.errors[0].msg} })
            } else if (response.success){
              this.refresh()
            }
          }
        )
    }
  }

}
