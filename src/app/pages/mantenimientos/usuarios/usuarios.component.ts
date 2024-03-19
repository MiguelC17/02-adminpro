import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0
  public usuarios: Usuario[] = []
  public usuariosTemp: Usuario[] = []
  public desde: number = 0
  public cargando: boolean = true
  public imgSubs: Subscription

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarUsuariosPaginados()

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe({
        next: (img) => { this.cargarUsuariosPaginados() }
      })
  }

  cargarUsuariosPaginados() {
    this.cargando = true
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe({
        next: ({ total, usuarios }) => {
          this.totalUsuarios = total
          this.usuarios = usuarios
          this.usuariosTemp = usuarios
          this.cargando = false
        }
      })
  }

  cambiarPagina(valor: number) {

    this.desde += valor

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor
    }

    this.cargarUsuariosPaginados()

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      this.usuarios = [...this.usuariosTemp]
    } else {
      this.busquedasService.buscar('usuarios', termino)
        .subscribe({
          next: (resultados: Usuario[]) => {
            this.usuarios = resultados
          }
        })
    }
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede borrarse a sí mismo', 'error')
    } else {
      Swal.fire({
        title: "¿Estás seguro?",
        text: `Está a punto de borrar a ${usuario.nombre}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si, elimínalo"
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(usuario)
            .subscribe({
              next: (resp) => {
                this.cargarUsuariosPaginados()

                Swal.fire({
                  title: "Eliminado",
                  text: `${usuario.nombre} ha sido eliminado.`,
                  icon: "success"
                });
              }
            })
        }
      });
    }
  }

  cambiarRole(usuario: Usuario) {

    this.usuarioService.guardarUsuario(usuario)
      .subscribe({
        next: (resp) => { console.log(resp) }
      })

  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img)
  }


}
