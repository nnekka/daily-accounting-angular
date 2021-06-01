import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {combineLatest, Subscription} from "rxjs/index";
import {OverviewService} from "../../../shared/services/overview.service";
import {Expenditure, Gain} from "../../../shared/interfaces";
import {Chart, registerables} from "chart.js";
import {map} from "rxjs/operators";
import {AccountService} from "../../../shared/services/account.service";
import {Account} from "../../../shared/interfaces";


@Component({
  selector: 'app-graph-report',
  templateUrl: './graph-report.component.html',
  styleUrls: ['./graph-report.component.css']
})
export class GraphReportComponent implements OnInit {


  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: ElementRef

  private _routerSubscription: Subscription;
  params: { startDate: Date, endDate: Date, expGain: string }
  gains: Gain[]
  expenditures: Expenditure[]
  account: Account


  constructor(
    private route: ActivatedRoute,
    private overviewService: OverviewService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.getParams()
  }

  private getParams() {
    this._routerSubscription = combineLatest(this.route.params, this.route.queryParams)
      .subscribe(
        ([account, session]) => {
          this.params = {
            startDate: session.startDate,
            endDate: session.endDate,
            expGain: session.expGain
          }
          console.log(this.params)
          if (account.id){
            this.accountService.getAccountById(account.id).subscribe(
              (account: Account) => {
                this.account = account
              }
            )
          }

          if (account.id && this.params.expGain === 'gain') {
            this.overviewService.getAccountGains(this.params.startDate, this.params.endDate, account.id)
              .pipe(
                map(
                  (gains: Gain[]) => {
                    this.gains = gains
                    return this.createDataObject(this.gains, 'gain')
                  })
              )
              .subscribe(
                (data) => {
                  this.createPieDiagram(Object.keys(data), Object.values(data))
                }
              )
          }

          if (!account.id && this.params.expGain === 'gain') {
            this.overviewService.getTotalGains(this.params.startDate, this.params.endDate)
              .pipe(
                map(
                  (gains: Gain[]) => {
                    this.gains = gains
                    return this.createDataObject(this.gains, 'gain')
                  })
              )
              .subscribe(
                (data) => {
                  this.createPieDiagram(Object.keys(data), Object.values(data))
                }
              )
          }

          if (account.id && this.params.expGain === 'exp') {
            this.overviewService.getAccountExpenditures(this.params.startDate, this.params.endDate, account.id)
              .pipe(
                map(
                  (expenditures: Expenditure[]) => {
                    this.expenditures = expenditures
                    return this.createDataObject(this.expenditures, 'exp')
                  })
              )
              .subscribe(
                (data) => {
                  this.createPieDiagram(Object.keys(data), Object.values(data))
                }
              )
          }

          if (!account.id && this.params.expGain === 'exp') {
            this.overviewService.getTotalExpendirures(this.params.startDate, this.params.endDate)
              .pipe(
                map(
                  (expenditures: Expenditure[]) => {
                    this.expenditures = expenditures
                    return this.createDataObject(this.expenditures, 'exp')
                  })
              )
              .subscribe(
                (data) => {
                  this.createPieDiagram(Object.keys(data), Object.values(data))
                }
              )
          }

          if (account.id && this.params.expGain === 'total') {
            this.overviewService.getAccountGainsAndExps(this.params.startDate, this.params.endDate, account.id)
              .subscribe(
                (data) => {
                  this.createPieDiagram(['Доходы', 'Расходы'], [`${data.totalGains}`, `${data.totalExps}`])
                }
              )
          }

          if (!account.id && this.params.expGain === 'total') {
            this.overviewService.getTotalGainsAndExps(this.params.startDate, this.params.endDate)
              .subscribe(
                (data) => {
                  this.createPieDiagram(['Доходы', 'Расходы'], [`${data.totalGains}`, `${data.totalExps}`])
                }
              )
          }


        }
      )
  }

  private createDataObject(array: any, type: string){
    let obj
    type == 'gain'
     ? obj = array.map((item) => {
        return {category: item.category.name, sum: item.sum}
      })
      .reduce((a, b) => {
        a[b.category] = (a[b.category] || 0) + b.sum
        return a
      }, {})
      : type == 'exp'
          ? obj = array.map((item) => {
              return {category: item.category.name, itemPrice: item.itemPrice}
                })
              .reduce((a, b) => {
                  a[b.category] = (a[b.category] || 0) + b.itemPrice
                  return a
                }, {})
          : console.log('Еще не написала')
    return obj
  }

  createPieDiagram(labels: string[], data: any) {
    Chart.register(...registerables);
    setTimeout(() => {

      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: data,
              backgroundColor: Object.values({
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
              }),
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Pie Chart'
            }
          }
        },
      });
    }, 1000)
  }


//---------------------------------------

// private getParams() {
//   this._routerSubscription = combineLatest(this.route.params, this.route.queryParams)
//     .subscribe(
//       ([account, session]) => {
//         account.id
//           ? session.expGain === 'gain'
//                ? this.overviewService.getAccountGains(session.startDate, session.endDate, account.id)
//                    .subscribe((gains: Gain[]) => console.log(gains))
//                : session.expGain === 'exp'
//                    ? this.overviewService.getAccountExpenditures(session.startDate, session.endDate, account.id)
//                        .subscribe((expenditures: Expenditure[]) => console.log(expenditures))
//                    : console.log('че то там')
//           : console.log('получить все')
//
//       })
//
// }
}
