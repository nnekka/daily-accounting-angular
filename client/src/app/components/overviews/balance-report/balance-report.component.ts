import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";


@Component({
  selector: 'app-balance-report',
  templateUrl: './balance-report.component.html',
  styleUrls: ['./balance-report.component.css']
})
export class BalanceReportComponent implements OnInit {


  form: FormGroup
  accountId: string

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.getParams()
  }

  private initForm(){
    this.form = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    })
  }
  private getParams(){
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')){
          this.accountId = params.get('id')
        }
      }
    )
  }

  onSubmit(){

    if (this.accountId){
      this.router.navigate([`/graph`], {
        queryParams: {
          startDate: this.form.value.startDate.toISOString(),
          endDate: this.form.value.endDate.toISOString(),
          accountId: this.accountId
        }
      })

    } else {
      this.router.navigate([`/graph`], {
        queryParams: {
          startDate: this.form.value.startDate.toISOString(),
          endDate: this.form.value.endDate.toISOString(),
        }
      })
    }
  }



}
