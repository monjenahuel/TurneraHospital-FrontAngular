import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTurnosComponent } from './app-turnos/app-turnos.component';
import { LoginComponent } from './login/login.component';
import { AppPacientesComponent } from './app-pacientes/app-pacientes.component';
import { AppMainComponent } from './app-main/app-main.component';
import { RegistrarTurnoComponent } from './registrar-turno/registrar-turno.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchSelectPxComponent } from './search-select-px/search-select-px.component';
import { NgSelectModule } from '@ng-select/ng-select';


import { MaterialModule } from './material.module';
import { NewTurnModalComponent } from './modales/new-turn-modal/new-turn-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    AppTurnosComponent,
    AppMainComponent,
    LoginComponent,
    AppPacientesComponent,
    RegistrarTurnoComponent,
    SearchSelectPxComponent,
    NewTurnModalComponent
    
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
