import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/interfaces";
import {AccountService} from "../../shared/services/account.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //material stuff
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  //my stuff
  user: User
  accounts: Account[]
  totalMoney: number = 0

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
          if (this.accounts.length > 0){
            this.totalMoney = this.totalSum(this.accounts)
          }
        }
      }
    )

  }


  //material stuff
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  //my stuff
  onLogout(){
    this.authService.logout()
  }

  private totalSum(accounts: Account[]): number {
    const totalResult = accounts.reduce((sum, curr) => sum + curr.total, 0)
    return totalResult
  }

}
