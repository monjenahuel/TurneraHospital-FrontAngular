import { Component, ViewChild } from '@angular/core';
import { RegistrarTurnoComponent } from 'src/app/registrar-turno/registrar-turno.component';
import { TurnoModalServicio } from './new-turn-modal.servicio';


@Component({
  selector: 'app-new-turn-modal',
  templateUrl: './new-turn-modal.component.html',
  styleUrls: ['./new-turn-modal.component.css']
})
export class NewTurnModalComponent {

  //Comunicacion Padre-Hijo
  @ViewChild(RegistrarTurnoComponent) hijo: RegistrarTurnoComponent;

  constructor( private Modalservicio : TurnoModalServicio ){
  }

  toggleModal(){
    this.Modalservicio.switchModal()
    
    //Metodo que reinicie o vuelva a iniciar registrar-turno (Relacion Padre -> Hijo)
    //this.hijo.reiniciarForm()
  }

  modalPico(){
    return this.Modalservicio.getModal()
  }


}
