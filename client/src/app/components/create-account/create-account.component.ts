import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Currency} from "../../shared/interfaces";
import {AccountService} from "../../shared/services/account.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorComponent} from "../error/error.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup

  currencyArray: string[] = ['рубль', 'евро', 'доллар']
  currency: string


  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null),
      total: new FormControl(null)
    })
  }

  onSubmit(){
    let curr = ''
    if (this.currency == 'рубль'){
      curr = 'rub'
    } else if (this.currency == 'евро'){
      curr = 'euro'
    } else if (this.currency == 'доллар'){
      curr = 'dollar'
    }
    this.accountService.createAccount(
      this.form.value.name,
      this.form.value.total,
      curr
    )
      .subscribe(
        (response) => {
          if (response.errors){
            this.dialog.open(ErrorComponent, {data: {message: response.errors[0].msg} })
          } else if (response.success){
            this.router.navigate(['/accounts'])
          }
        }
      )
  }

}




