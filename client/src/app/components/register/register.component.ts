import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/interfaces";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.sub = this.authService.register(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
      )
      .subscribe(
        (user: User) => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        }
      )
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe()
    }
  }

}
