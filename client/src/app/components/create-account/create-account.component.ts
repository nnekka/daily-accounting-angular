import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../shared/services/account.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorComponent} from "../error/error.component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Account} from "../../shared/interfaces";


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup

  currencyArray: string[] = ['рубль', 'евро', 'доллар']
  currency: string
  editMode = false
  accountId: string
  account: Account


  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      total: new FormControl(null)
    })

    this.getParams()
  }

  private getParams(){
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')){
          this.accountId = params.get('id')
          this.editMode = true
          this.accountService.getAccountById(this.accountId)
            .subscribe(
              (account: Account) => {
                this.account = account
                this.form.setValue({
                  name: account.name,
                  total: account.total
                })
              }
            )
        }
      }
    )
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
    if (this.editMode && this.accountId) {
      this.accountService.editAccountName(this.form.value.name, this.accountId)
        .subscribe(
          (response) => {
            if (response.errors){
              this.dialog.open(ErrorComponent, {data: {message: response.errors[0].msg} })
            } else if (response.success){
              this.router.navigate(['/accounts'])
            }
          }
        )
    } else {
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

}




