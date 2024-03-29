import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup
  public usuario: Usuario
  public imagenASubir: File
  public imgTemp: any = null

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe({
        next: () => {
          const { nombre, email } = this.perfilForm.value
          this.usuario.nombre = nombre
          this.usuario.email = email

          Swal.fire('Excelente!', 'Se ha actualizado el usuario', 'success')
        },
        error: (err) => {
          console.log(err)
          Swal.fire('Sopas', err.error.msg, 'error')
        }
      })
  }

  cambiarImagen(file: File) {
    this.imagenASubir = file

    if ( !file ) {
      return this.imgTemp = null
    }

    const reader = new FileReader()
    reader.readAsDataURL( file )

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenASubir, 'usuarios', this.usuario.uid)
      .then( img => {
        this.usuario.img = img
        Swal.fire('Excelente!', 'Se ha actualizado la imagen', 'success')
      }).catch(err => {
        Swal.fire('Sopas', err.error.msg, 'error')
      })

  }
}
