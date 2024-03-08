import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario?: Usuario

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  logout() {
    localStorage.removeItem('token')
    location.reload()
    google.accounts.id.revoke('macc1712@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login')
      })
    })
  }

  validarToken() {
    const token = localStorage.getItem('token') || ''

    return this.http.get(`${base_url}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, img, uid } = resp.usuario
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid)
        localStorage.setItem('token', resp.token)
        return true
      }),
      catchError((error) => { return of(false) })
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => { localStorage.setItem('token', resp.token) })
      )
  }

  login(formData: any) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => { localStorage.setItem('token', resp.token) })
      )
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

}
