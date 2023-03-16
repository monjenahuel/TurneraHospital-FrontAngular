import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { AppPacientesComponent } from './app-pacientes/app-pacientes.component';
import { AppTurnosComponent } from './app-turnos/app-turnos.component';
import { LoginComponent } from './login/login.component';
import { NewTurnModalComponent } from './modales/new-turn-modal/new-turn-modal.component';
import { RegistrarTurnoComponent } from './registrar-turno/registrar-turno.component';

const routes: Routes = [
  { path: '', component: RegistrarTurnoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'turnos', component: AppTurnosComponent },
  { path: 'pacientes', component: AppPacientesComponent},
  { path: 'new/turno', component: RegistrarTurnoComponent},
  { path: 'modal', component: NewTurnModalComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
