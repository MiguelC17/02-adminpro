import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  public imagenASubir: File
  public imgTemp: any = null

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService,
  ) { }

  cerrarModal() {
    this.imgTemp = null
    this.modalImagenService.cerrarModal()
  }

  cambiarImagen(file: File) {
    this.imagenASubir = file

    if (!file) {
      return this.imgTemp = null
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

  }

  subirImagen() {

    const id = this.modalImagenService.id
    const tipo = this.modalImagenService.tipo

    this.fileUploadService
      .actualizarFoto(this.imagenASubir, tipo, id)
      .then(img => {
        Swal.fire('Excelente!', 'Se ha actualizado la imagen', 'success')

        this.modalImagenService.nuevaImagen.emit(img)

        this.cerrarModal()
      }).catch(err => {
        Swal.fire('Sopas', err.error.msg, 'error')
      })

  }

}
