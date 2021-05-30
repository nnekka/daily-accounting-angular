import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../../shared/services/account.service";
import {Account} from "../../../shared/interfaces";

@Component({
  selector: 'app-gains-report',
  templateUrl: './gains-report.component.html',
  styleUrls: ['./gains-report.component.css']
})
export class GainsReportComponent implements OnInit {

  accounts: Account[]


  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.accountsSubject.subscribe(
      (accounts: Account[]) => {
        if (accounts){
          this.accounts = accounts
          console.log(this.accounts)
        }
      }
    )
  }



}
