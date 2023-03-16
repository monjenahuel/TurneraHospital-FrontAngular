import { Component } from '@angular/core';
import { Turno } from '../clases/turno';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTurnModalComponent } from '../modales/new-turn-modal/new-turn-modal.component';
import { TurnoModalServicio } from '../modales/new-turn-modal/new-turn-modal.servicio';


@Component({
  selector: 'app-app-turnos',
  templateUrl: './app-turnos.component.html',
  styleUrls: ['./app-turnos.component.css']
})
export class AppTurnosComponent {

  turnos:Turno[] = [];

  turnosPreCargados:Turno[] = []

  regexHora:RegExp = /\d\d:\d\d/

  switchTurnos = new FormControl(true);


  //Two way binding
  busqueda:string = "";
  
  constructor(private http: HttpClient, private modal: TurnoModalServicio){}

  async ngOnInit(){
    this.getAllTurnos()
  }

  editarTurno(turno:Turno){
    this.modal.switchModal(turno)
  }

  eliminarTurno(turno:Turno){
    console.log(turno)
  }

  getAllTurnos() {
    const url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/turno';
    this.http.get<Turno[]>(url).subscribe(data => {
      this.turnos = data;
      console.log(this.turnos)
      
      //Carga una copia de los turnos para poder filtrarlos con busquedas dinamicas
      this.turnosPreCargados = []
      this.turnos.forEach(t => this.turnosPreCargados.push(t))
    });
  }

  getTurnosHoy(){
    let currentDate:string = new Date().toJSON().slice(0, 10);

    this.turnos = this.turnos.filter(t => t.fechaHora.split(' ', 2)[0] == currentDate)
    
    //Carga una copia de los turnos para poder filtrarlos con busquedas dinamicas
    this.turnosPreCargados = []
    this.turnos.forEach(t => this.turnosPreCargados.push(t))
  }

  async getSearch(search:any){
    this.turnos = this.turnosPreCargados;
    
    this.turnos = this.turnos.filter(t => (
      t.apellidoPX + " " + t.nombrePX + " " + t.dniPX + " " + 
      t.especialidad + " " + t.especialidad + " " + t.profesional).toLowerCase()
      .includes(search.toLowerCase())
      )
  }
  
  //Usando Form Control
  onClickSwitch(){
    if (this.switchTurnos.value) {
      this.getTurnosHoy()
    } else {
      this.getAllTurnos()
    }
  }

  agregarTurno(){
    this.modal.switchModal()
  }

}
