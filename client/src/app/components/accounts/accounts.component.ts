import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../../shared/services/account.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[]
  isPending = false
  displayedColumns: string[] = [ 'name', 'total', 'currency', 'dir' ]

  array: any[]

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isPending = true


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
  }

  getCurrency(){
    this.http.get('http://uk.finance.yahoo.com/currencies/converter/#from=GBP;to=EUR;amt=1')
      .subscribe(
        (data) => {
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }



}
