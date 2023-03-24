import { Component } from '@angular/core';
import { PacienteModalServicio } from './new-paciente-modal-servicio';

@Component({
  selector: 'app-new-paciente-modal',
  templateUrl: './new-paciente-modal.component.html',
  styleUrls: ['./new-paciente-modal.component.css']
})
export class NewPacienteModalComponent {


    constructor( private Modalservicio : PacienteModalServicio ){
    }
  
    toggleModal(){
      this.Modalservicio.switchModal()
    }
  
    modalPico(){
      return this.Modalservicio.getModal()
    }

}
