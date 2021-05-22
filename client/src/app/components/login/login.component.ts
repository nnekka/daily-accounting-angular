import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs/internal/Subscription";

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
    private snackBar: MatSnackBar
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
          this.snackBar.open('Теперь вы можете залогиниться', 'Ok', {
            duration: 3000,
            panelClass: 'my-custom-snackbar'
          })
        } else if (params['sessionFailed']){
          this.snackBar.open('Время сессии истекло, залогиньтесь опять', 'Ok', {
            duration: 3000,
            panelClass: 'my-custom-snackbar'
          })
        }
      }
    )
  }

  onSubmit(){
    this.sub = this.authService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        (user: User) => {
          this.router.navigate(['/accounts'])
        },
        error => {
          this.form.reset()
          console.log('Ошибка при логине в логин компоненте')

        }
      )
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe()
    }
  }

}
