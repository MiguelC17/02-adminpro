import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {

  public labels1: string[] = [ 'hola', 'que', 'tal'];
  public data1 = {
    labels: this.labels1,
    datasets: [
      { data: [11, 12, 15],
        backgroundColor: ['#9E120E', '#FF5800', '#FFB414'],
      },
    ],
  };

}
