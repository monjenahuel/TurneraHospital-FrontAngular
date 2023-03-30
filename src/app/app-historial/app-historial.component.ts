import { Component } from '@angular/core';
import { TurnoServicio } from '../Servicios/turno-servicio';

@Component({
  selector: 'app-app-historial',
  templateUrl: './app-historial.component.html',
  styleUrls: ['./app-historial.component.css']
})
export class AppHistorialComponent {

  constructor(private turnoServicio:TurnoServicio){}

}
