import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/interfaces";

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

  constructor(
    private authService: AuthService
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

}
