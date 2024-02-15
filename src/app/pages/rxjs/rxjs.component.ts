import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription

  constructor() {

/*
    this.thisReturnsAnObservable()
      .pipe(
        retry(1)
      )
      .subscribe({
        next: value => console.log( 'Subs: ', value ),
        error: err => console.warn( 'Error: ', err ),
        complete: () => console.info( 'Obs terminado' )
    })
*/

    this.intervalSubs = this.thisReturnsAnInterval()
      .subscribe({
        next: ( value ) => console.log( value )
      })

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

  thisReturnsAnInterval(): Observable<number> {

    return interval(500)
            .pipe(
              map( value => value + 1 ), // 0 => 1
              filter( value => ( value % 2 === 0 ) ? true : false ),
              take(10),
            )

  }


  thisReturnsAnObservable(): Observable<number> {

    let i = -1

    const obs$ = new Observable<number>(observer => {
      const imAnInterval = setInterval(() => {
        i++
        observer.next(i)
        if (i === 4) {
          clearInterval(imAnInterval)
          observer.complete()
        }
        if (i === 2) {
          observer.error('i llego al valor de 2')
          clearInterval( imAnInterval )
        }
      }, 1000)
    })

    return obs$

  }

}
