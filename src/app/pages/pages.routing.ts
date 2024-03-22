import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ authGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'charts1', component: Grafica1Component, data: { title: 'Charts 1' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' } },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Busquedas' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
      { path: 'profile', component: PerfilComponent, data: { title: 'My Profile' } },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Mantenimiento de Medico' } },

      // Rutas de Admin
      { path: 'usuarios', canActivate: [ adminGuard ], component: UsuariosComponent, data: { title: 'Mantenimiento de Usuarios' } },
    ],
  },

]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
