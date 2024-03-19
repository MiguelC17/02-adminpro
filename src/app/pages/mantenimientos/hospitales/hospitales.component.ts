import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = []
  public hospitalesTemp: Hospital[] = []
  public cargando: boolean = true
  private imgSubs: Subscription

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarHospitales()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe({
        next: (img) => { return this.cargarHospitales() }
      })
  }

  cargarHospitales() {
    this.cargando = true

    this.hospitalService.cargarHospitales()
      .subscribe({
        next: (hospitales) => {
          this.cargando = false
          this.hospitales = hospitales
          this.hospitalesTemp = hospitales
        }
      })
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe({
        next: (resp) => {
          Swal.fire('Actualizado', hospital.nombre, 'success')
        }
      })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id)
      .subscribe({
        next: (resp) => {
          Swal.fire('Eliminado', hospital.nombre, 'success')
          this.cargarHospitales()
        }
      })
  }

  async abrirSwal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: `text`,
      inputPlaceholder: `Nombre del hospital`,
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe({
          next: (resp: any) => {
            this.hospitales.push( resp.hospital )
          }
        })
    }

  }

  abrirModal( hospital: Hospital ) {
    this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img )
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.hospitales = [...this.hospitalesTemp]
    } else {
      this.busquedasService.buscar('hospitales', termino)
        .subscribe({
          next: (resultados: Hospital[]) => {
            this.hospitales = resultados
          }
        })
    }
  }

}
