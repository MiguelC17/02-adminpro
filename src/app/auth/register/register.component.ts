import { Component } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public formSubmitted = false

  public registerForm: FormGroup = this.fb.group({
    nombre: ['Santiago', Validators.required],
    email: ['santiago@gmail.com', [Validators.required, Validators.email]],
    password: ['123456789', Validators.required],
    password2: ['123456789', Validators.required],
    terminos: [true, Validators.required],
  }, { validators: this.passwordsIguales('password', 'password2') } as FormControlOptions)

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  crearUsuario() {
    this.formSubmitted = true
    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      return
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: (resp) => {
          console.log('usuario creado');
          console.log(resp)
        },
        error: (err) => {
          console.warn(err.error.msg)
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error')
        }
      })
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  contrasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name)
      const pass2Control = formGroup.get(pass2Name)
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }
}
