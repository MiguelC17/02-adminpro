import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ''
})
export class DonaComponent {

  @Input() title: string = 'Sin título'
  @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3'];

  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100],
        backgroundColor: ['#9E120E', '#FF5800', '#FFB414'],
      },
    ],
  };

  // public doughnutChartType: ChartType = 'doughnut';


}
