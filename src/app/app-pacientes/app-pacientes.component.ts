import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Paciente } from '../clases/paciente';
import { PacienteModalServicio } from '../modales/new-paciente-modal/new-paciente-modal-servicio';
import { PacienteServicio } from '../Servicios/pacientes-servicio';

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
      title: '¿Seguro que desea eliminar al paciente ' + paciente.apellido + " " +paciente.nombre + '?',
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
        
          this.PacienteServicio.deletePaciente(paciente.id).subscribe(
            data => {
              this.PacienteServicio.eliminarPacienteDelArray(paciente)

              Swal.fire(
                'Listo!',
                'El paciente fue eliminado',
                'success'
              )
            },
            error => {
              Swal.fire(
                'Error',
                'El paciente tiene un turno asignado',
                'error'
              )
            }
          );
      }
    })
  }

    getSearch(search:string){

      this.PacienteServicio.pacientesList = this.PacienteServicio.pacientesPreCargados

      let palabrasBuscadas:string[] = search.split(" ")

      palabrasBuscadas.forEach((palabra) => {

        this.PacienteServicio.pacientesList = this.PacienteServicio.pacientesList.filter(px => 
        JSON.stringify(px).toString().toLowerCase().includes(palabra.toLowerCase())
        )

      })

    }

    agregarPxModal(){
      this.modal.switchModal()
    }

}
