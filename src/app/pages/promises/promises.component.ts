import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: ``
})
export class PromisesComponent implements OnInit {

  ngOnInit(): void {
    this.getUsuarios()
      .then( usuarios => {
        console.log( usuarios )
      })

/*
    const promise = new Promise( ( resolve, reject ) => {

      if (true) {
        resolve('Hola mundo')
      } else {
        reject('Algo salió mal')
      }

    })

    promise
      .then(( mensaje ) => {
        console.log(mensaje);
      })
      .catch( error => console.log('Error en mi promesa', error))

    console.log('fin del init');
*/
  }

  getUsuarios() {

    const promise = new Promise( (resolve, reject) => {

      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data))

    })

    return promise

  }


}
