import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHistorialComponent } from './app-historial/app-historial.component';
import { AppPacientesComponent } from './app-pacientes/app-pacientes.component';
import { AppTurnosComponent } from './app-turnos/app-turnos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'turnos', component: AppTurnosComponent },
  { path: 'pacientes', component: AppPacientesComponent},
  { path: 'estadisticas', component: AppHistorialComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
