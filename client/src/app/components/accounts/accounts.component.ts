import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from "../../shared/services/account.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[]
  isPending = false
  displayedColumns: string[] = [ 'name', 'total', 'currency', 'dir' ];

  constructor(
    private accountService: AccountService
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

}
