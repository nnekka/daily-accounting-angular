import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {DataForChart} from "../../../../shared/interfaces";
import {OverviewService} from "../../../../shared/services/overview.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: ElementRef

  dataForChart: DataForChart[]
  params: any

  constructor(
    private overviewService: OverviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParams()
  }

  private getParams(){
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.params = params
        if (this.params.accountId){
          this.overviewService.getOneAccountBalanceInfo(
            this.params.startDate,
            this.params.endDate,
            this.params.accountId
          ).subscribe(
            (dataForChart: DataForChart[]) => {
              this.dataForChart = dataForChart
              const labels = this.dataForChart.map(item => Object.values(item)[1])
              const data = this.dataForChart.map(item => Object.values(item)[0])
              this.createLineGraph(labels, data)
            }
          )
        } else {
          this.overviewService.getTotalBalanceInfo(
            this.params.startDate,
            this.params.endDate
          ).subscribe(
            (dataForChart: DataForChart[]) => {
              this.dataForChart = dataForChart
              const labels = this.dataForChart.map(item => Object.values(item)[1])
              const data = this.dataForChart.map(item => Object.values(item)[0])
              this.createLineGraph(labels, data)
            }
          )
        }
      }
    )
  }


  private createLineGraph(labels: Date[], data: string[]) {
    Chart.register(...registerables);
    setTimeout(() => {

      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: data,
              borderColor: 'red'
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
              text: 'ЬУУУЪЪЪ'
            }
          }
        },
      });
    }, 1000)
  }

}
