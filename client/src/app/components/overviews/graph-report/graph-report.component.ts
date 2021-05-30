import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {combineLatest, Subscription} from "rxjs/index";
import {OverviewService} from "../../../shared/services/overview.service";
import {Expenditure, Gain} from "../../../shared/interfaces";

@Component({
  selector: 'app-graph-report',
  templateUrl: './graph-report.component.html',
  styleUrls: ['./graph-report.component.css']
})
export class GraphReportComponent implements OnInit {

  private _routerSubscription: Subscription;
  params: { startDate: Date, endDate: Date, expGain: string }
  gains: Gain[]
  expenditures: Expenditure[]

  constructor(
    private route: ActivatedRoute,
    private overviewService: OverviewService
  ) {}

  ngOnInit(): void {
    this.getParams()
  }

  private getParams() {
    this._routerSubscription = combineLatest(this.route.params, this.route.queryParams)
      .subscribe(
        ([account, session]) => {
          if (account.id) {
            this.params = {
              startDate: session.startDate,
              endDate: session.endDate,
              expGain: session.expGain
            }
            if (this.params.expGain === 'gain') {
              this.overviewService.getAccountGains(this.params.startDate, this.params.endDate, account.id)
                .subscribe(
                  (gains: Gain[]) => {
                    this.gains = gains
                    console.log(this.gains)
                  }
                )
            } else if (this.params.expGain === 'exp') {
              this.overviewService.getAccountExpenditures(this.params.startDate, this.params.endDate, account.id)
                .subscribe(
                  (expenditures: Expenditure[]) => {
                    this.expenditures = expenditures
                    console.log(this.expenditures)
                  }
                )
            } else {
              console.log('еще не написала функцию')
            }
          } else {
            this.params = {
              startDate: session.startDate,
              endDate: session.endDate,
              expGain: session.expGain
            }
            console.log('получить все и сразу')
          }
        });
  }

}
