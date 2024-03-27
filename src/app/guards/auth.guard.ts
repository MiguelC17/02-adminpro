import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const canMatch: CanMatchFn = () => {

  const router = inject(Router)
  const usuarioService = inject(UsuarioService)

  return usuarioService.validarToken()
    .pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigateByUrl('/login')
        }
      })
    )

}

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService)
  const router = inject(Router)

  return usuarioService.validarToken()
    .pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigateByUrl('/login')
        }
      })
    )
};
