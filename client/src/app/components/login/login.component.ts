import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {Subscription} from "rxjs/internal/Subscription";
import {MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private matService: MaterialService
  ) {}

  ngOnInit(): void {

    this.authService.userLogged.subscribe(
      (user: User) => {
        if (user){
          this.router.navigate(['/accounts'])
        }
      }
    )
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })

    this.getParams()
  }

  private getParams(){
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['registered']){
          this.matService.showMessage('Теперь вы можете залогиниться')
        } else if (params['sessionFailed']){
          this.matService.showMessage('Время сессии истекло, залогиньтесь опять')
        } else if (params['accessDenied']){
          this.matService.showMessage('Залогиньтесь для этого действия')
        }
      }
    )
  }

  onSubmit(){
    this.sub = this.authService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        (user: User) => {
          this.router.navigate(['/accounts'])
        }
      )
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe()
    }
  }

}
