import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../shared/services/auth.service";
import {CurrencyData, User} from "../../shared/interfaces";
import {AccountService} from "../../shared/services/account.service";
import {Account} from "../../shared/interfaces";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //material stuff
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;


  //my stuff
  user: User
  accounts: Account[]
  totalMoney: number = 0
  currencies: CurrencyData[] = []

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.userLogged.subscribe(
      (user: User) => {
        if (user){
          this.user = user
        } else {
          console.log('BehaviourSubject передает null')
        }
      }
    )

    this.accountService.accountsSubject.subscribe(
      (accounts: Account[]) => {
        if (accounts){
          this.accounts = accounts
          if (this.accounts.length > 0 && this.currencies.length > 0){
            this.totalMoney = this.totalSum(this.accounts)
          }
        }
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


  onLogout(){
    this.authService.logout()
  }

  private totalSum(accounts: Account[]): number {
    let sum = 0
    const totalResult  = accounts.map(account => {

      if (account.currency === 'rub'){
        sum += account.total
      } else if (account.currency === 'euro'){
        sum += account.total*this.currencies[1].value
      } else if (account.currency === 'dollar'){
        sum += account.total*this.currencies[0].value
      }
    })
    return +sum.toFixed(2)
  }

}
