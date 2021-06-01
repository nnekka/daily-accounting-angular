import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../shared/services/account.service";
import {Account} from "../../shared/interfaces";

@Component({
  selector: 'app-overviews',
  templateUrl: './overviews.component.html',
  styleUrls: ['./overviews.component.css']
})
export class OverviewsComponent implements OnInit {

  accounts: Account[]

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.accountsSubject.subscribe(
      (accounts: Account[]) => {
        if (accounts){
          this.accounts = accounts
        }
      }
    )
  }

}
