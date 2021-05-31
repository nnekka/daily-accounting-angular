import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements AfterViewInit {

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: ElementRef
  constructor() {
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    setTimeout(() => {
      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['Зарплата', 'Подарок', 'Мяу'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [10, 40, 40],
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


}
