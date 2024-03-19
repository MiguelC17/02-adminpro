import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { Subscription, delay } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = []
  public medicosTemp: Medico[] = []
  public cargando: boolean = true
  private imgSubs: Subscription

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.cargarMedicos()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe({
        next: () => { return this.cargarMedicos() }
      })

  }

  cargarMedicos() {
    this.cargando = true

    this.medicoService.cargarMedicos()
      .subscribe({
        next: (medicos) => {
          this.cargando = false
          this.medicos = medicos
          this.medicosTemp = medicos
        }
      })
  }

  abrirModal( medico: Medico ) {
    this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img )
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.medicos = [...this.medicosTemp]
    } else {
      this.busquedasService.buscar('medicos', termino)
        .subscribe({
          next: (resultados: Medico[]) => {
            this.medicos = resultados
          }
        })
    }
  }

  eliminarMedico( medico: Medico ) {


      Swal.fire({
        title: "¿Estás seguro?",
        text: `Está a punto de borrar al médico ${medico.nombre}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si, elimínalo"
      }).then((result) => {
        if (result.isConfirmed) {
          this.medicoService.eliminarMedico(medico._id)
            .subscribe({
              next: (resp) => {
                this.cargarMedicos()

                Swal.fire({
                  title: "Médico eliminado",
                  text: `${medico.nombre} ha sido eliminado.`,
                  icon: "success"
                });
              }
            })
        }
      });
    }


}
