import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AccountService} from "../../../shared/services/account.service";
import {Account} from "../../../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-overviews',
  templateUrl: './main-overviews.component.html',
  styleUrls: ['./main-overviews.component.css']
})
export class MainOverviewsComponent implements OnInit {

  form: FormGroup
  view: string
  viewArray = ['График(диаграмма)', 'Таблица']
  expGainarray = ['Доходы', 'Расходы', 'Все вместе']
  accounts: Account[]

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.accountService.accountsSubject.subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts
      }
    )
  }

  private initForm(){
    this.form = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      view: new FormControl(null),
      expGain: new FormControl(null),
      account: new FormControl(null)
    })
  }



  onSubmit(){
    if (this.form.value.view === 'graph' && this.form.value.account !== null){
      this.router.navigate([`/graph-report/${this.form.value.account}`], {
        queryParams: {
          startDate: this.form.value.startDate.toISOString(),
          endDate: this.form.value.endDate.toISOString(),
          expGain: this.form.value.expGain
        }
      })
    } else if (this.form.value.view === 'graph' && this.form.value.account === null){
      this.router.navigate([`/graph-report`], {
        queryParams: {
          startDate: this.form.value.startDate,
          endDate: this.form.value.endDate,
          expGain: this.form.value.expGain
        }
      })
    } else if (this.form.value.view === 'table' && this.form.value.account !== null){

    } else {

    }
  }
}
