import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ``
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`
  }

  // @Input('renombreDelArgumentoQueSePideEnElPadre') progress: number = 50;
  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';


  @Output('value') outValue: EventEmitter<number> = new EventEmitter()

  changeValue( value: number ) {

    if ( this.progress >= 100 && value >= 0 ) {
      this.outValue.emit(100)
      this.progress = 100
      return
    }

    if ( this.progress <= 0 && value <= 0 ) {
      this.outValue.emit(0)
      this.progress = 0
      return
    }

    this.progress = this.progress + value
    this.outValue.emit(this.progress)

  }

  onChange( newValue: number ) {

    if ( newValue >= 100 ) {
      this.progress = 100
    } else if ( newValue <= 0 ) {
      this.progress = 0
    } else {
      this.progress = newValue
    }

    this.outValue.emit( this.progress )

  }

}
