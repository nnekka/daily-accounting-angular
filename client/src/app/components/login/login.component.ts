import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatError} from "@angular/material/form-field";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

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
          });
        }
      }
    )
  }

  onSubmit(){
    this.authService.login(this.form.value.email, this.form.value.password)
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

}
