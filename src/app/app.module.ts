import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppMainComponent } from './app-main/app-main.component';
import { AppPacientesComponent } from './app-pacientes/app-pacientes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppTurnosComponent } from './app-turnos/app-turnos.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrarTurnoComponent } from './registrar-turno/registrar-turno.component';
import { SearchSelectPxComponent } from './search-select-px/search-select-px.component';


import { MaterialModule } from './material.module';
import { NewPacienteModalComponent } from './modales/new-paciente-modal/new-paciente-modal.component';
import { NewTurnModalComponent } from './modales/new-turn-modal/new-turn-modal.component';
import { RegistrarPacienteComponent } from './registrar-paciente/registrar-paciente.component';
import { AppHistorialComponent } from './app-historial/app-historial.component';


@NgModule({
  declarations: [
    AppComponent,
    AppTurnosComponent,
    AppMainComponent,
    LoginComponent,
    AppPacientesComponent,
    RegistrarTurnoComponent,
    SearchSelectPxComponent,
    NewTurnModalComponent,
    NewPacienteModalComponent,
    RegistrarPacienteComponent,
    AppHistorialComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
