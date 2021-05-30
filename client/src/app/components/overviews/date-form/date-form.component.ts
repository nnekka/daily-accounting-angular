import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {combineLatest} from "rxjs";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.css']
})
export class DateFormComponent implements OnInit, OnDestroy {

  private _routerSubscription: Subscription;
  form: FormGroup
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getParams()
  }

  private getParams(){
    // this.route.queryParams.subscribe(
    //   (params: Params) => {
    //     console.log(params)
    //   }
    // )
    this._routerSubscription = combineLatest(
      this.route.params,
      this.route.queryParams
    ).subscribe(([id, session]) => {
      console.log(session, id);
    });

  }

  private initForm(){
    this.form = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null)
    })
  }

  onSubmit(){
    if (this.form.value.startDate < this.form.value.endDate){
      console.log('можно')
    } else {
      console.log('нельзя')
    }
  }

  ngOnDestroy(): void {
    if (this._routerSubscription){
      this._routerSubscription.unsubscribe()
    }
  }
}
