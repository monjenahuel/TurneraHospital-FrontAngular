import { Component, Injectable } from '@angular/core';
import { Turno } from '../clases/turno';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTurnModalComponent } from '../modales/new-turn-modal/new-turn-modal.component';
import { TurnoModalServicio } from '../modales/new-turn-modal/new-turn-modal.servicio';
import { TurnoServicio } from '../Servicios/turno-servicio';
import Swal from 'sweetalert2';
import { PacienteModalServicio } from '../modales/new-paciente-modal/new-paciente-modal-servicio';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-app-turnos',
  templateUrl: './app-turnos.component.html',
  styleUrls: ['./app-turnos.component.css']
})
export class AppTurnosComponent {

  switchTurnos = new FormControl(true);

  //Two way binding
  busqueda:string = "";
  
  constructor(private http: HttpClient, private modal: TurnoModalServicio, private turnosServ: TurnoServicio, private modalPaciente:PacienteModalServicio){}

  ngOnInit(){
    this.turnosServ.ngOnInit()
  }

  editarTurno(turno:Turno){
    this.modal.switchModal(turno)
  }

  eliminarTurno(turno:Turno){
    Swal.fire({
      title: '¿Seguro que desea eliminar el turno?',
      text: "Esta accion no se puede deshacer",
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        console.log("Eliminado")
        this.turnosServ.deleteTurno(turno.id).subscribe(data => {
          console.log(turno)
          this.turnosServ.eliminarTurnoDelArray(turno)
        })

        //this.turnosServ.eliminarTurnoDelArray(turno)

        Swal.fire(
          'Listo!',
          'El turno fue eliminado',
          'success'
        )
      }
    })
  }


  cargarTurnosPrecargados(){
    this.turnosServ.turnosList = this.turnosServ.turnosPreCargados
  }


  getSearch(search:any){
      
    this.turnosServ.turnosList = this.turnosServ.turnosPreCargados

    this.turnosServ.turnosList = this.turnosServ.turnosList.filter(t => (
        t.apellidoPX + " " + t.nombrePX + " " + t.dniPX + " " + 
        t.especialidad + " " + t.especialidad + " " + t.profesional).toLowerCase()
        .includes(search.toLowerCase())
        )
    }
  
  agregarTurnoModal(){
    this.modal.switchModal()
  }

  get turnosDelService(){
    if(this.switchTurnos.value)
      return this.turnosServ.turnosList
    else
      return this.turnosServ.turnosList.filter(t => t.fechaHora.split(' ', 2)[0] == new Date().toJSON().slice(0, 10))

}

modalPacienteOpen(){
  return this.modalPaciente.getModal()
}

}