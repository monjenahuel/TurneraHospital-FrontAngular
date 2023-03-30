import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Turno } from '../clases/turno';
import { PacienteModalServicio } from '../modales/new-paciente-modal/new-paciente-modal-servicio';
import { TurnoModalServicio } from '../modales/new-turn-modal/new-turn-modal.servicio';
import { TurnoServicio } from '../Servicios/turno-servicio';
import { PacienteServicio } from '../Servicios/pacientes-servicio';
import { EspecialidadServicio } from '../Servicios/especialidad-servicio';

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
  
  constructor(private http: HttpClient, private modal: TurnoModalServicio, private turnosServ: TurnoServicio, private modalPaciente:PacienteModalServicio, private pacientesServ:PacienteServicio,private especialidadServ:EspecialidadServicio){}

  ngOnInit(){
    this.turnosServ.actualizarListaDeTunors()
    this.pacientesServ.inicializar()
    this.especialidadServ.inicializar()
  }

  editarTurno(turno:Turno){
    this.modal.preCargarTurno(turno)
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
        
        this.turnosServ.deleteTurno(turno.id).subscribe(data => {
          this.turnosServ.eliminarTurnoDelArray(turno)
        },error =>{
          Swal.fire(
            'Error!',
            error.error.error,
            'error'
          )
        })

      }
    })
  }


  cargarTurnosPrecargados(){
    this.turnosServ.turnosList = this.turnosServ.turnosPreCargados
  }


  getSearch(search:string){

      this.turnosServ.turnosList = this.turnosServ.turnosPreCargados

      let palabrasBuscadas:string[] = search.split(" ")

      palabrasBuscadas.forEach((palabra) => {

      this.turnosServ.turnosList = this.turnosServ.turnosList.filter(t => 
        JSON.stringify(t).toString().toLowerCase().includes(palabra.toLowerCase())
        )

      })

    }
  
  agregarTurnoModal(){
    this.modal.switchModal()
  }

  get turnosDelService(){
    if(this.switchTurnos.value)
      return this.turnosServ.turnosList
    else
      return this.turnosServ.turnosList.filter(t => t.fechaHora.split('T', 2)[0] == new Date().toJSON().slice(0, 10))

}

modalPacienteOpen(){
  return this.modalPaciente.getModal()
}

}