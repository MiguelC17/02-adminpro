import { Component } from '@angular/core';
import { SideBarService } from '../../services/side-bar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent {

  public usuario!: Usuario

  constructor(
    public sideBarService: SideBarService,
    private usuarioService: UsuarioService,
  ) {
    this.usuario = usuarioService.usuario!
  }

}
