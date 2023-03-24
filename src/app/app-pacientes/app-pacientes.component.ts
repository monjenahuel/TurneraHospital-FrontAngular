import { Component } from '@angular/core';
import { PacienteServicio } from '../Servicios/pacientes-servicio';
import { Paciente } from '../clases/paciente';
import Swal from 'sweetalert2';
import { PacienteModalServicio } from '../modales/new-paciente-modal/new-paciente-modal-servicio';

@Component({
  selector: 'app-pacientes',
  templateUrl: './app-pacientes.component.html',
  styleUrls: ['./app-pacientes.component.css']
})
export class AppPacientesComponent {
  
  constructor(private PacienteServicio : PacienteServicio, private modal : PacienteModalServicio){

  }

  busqueda:string ="";

  ngOnInit(){
    this.PacienteServicio.inicializar()
  }

  get pacientes():Paciente[]{
    return this.PacienteServicio.pacientesList
  }

  editarPaciente(paciente:Paciente){
    this.modal.switchModal(paciente)
  }

  eliminarPaciente(paciente:Paciente){
    Swal.fire({
      title: '¿Seguro que desea eliminar el paciente?',
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
        
        try {
          this.PacienteServicio.deletePaciente(paciente.id).subscribe(data => {
            console.log(paciente)
            this.PacienteServicio.eliminarPacienteDelArray(paciente)
  
            Swal.fire(
              'Listo!',
              'El paciente fue eliminado',
              'success'
            )
          })
        } catch (error) {
          console.log(error)
        }
        

        
      }
    })
  }

  getSearch(search:any){
      
    this.PacienteServicio.pacientesList = this.PacienteServicio.pacientesPreCargados

    this.PacienteServicio.pacientesList = this.PacienteServicio.pacientesList.filter(t => (
        t.apellido + " " + t.nombre + " " + t.dni + " " + t.telefono + " " + t.email).toLowerCase()
        .includes(search.toLowerCase())
        )
    }

    agregarPxModal(){
      this.modal.switchModal()
    }

}
