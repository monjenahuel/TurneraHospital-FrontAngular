import { Component, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Paciente } from '../clases/paciente';
import { PacienteServicio } from '../Servicios/pacientes-servicio';
import { PacienteModalServicio } from '../modales/new-paciente-modal/new-paciente-modal-servicio';
import { TurnoModalServicio } from '../modales/new-turn-modal/new-turn-modal.servicio';



@Component({
  selector: 'app-search-select-px',
  templateUrl: './search-select-px.component.html',
  styleUrls: ['./search-select-px.component.css']
})
export class SearchSelectPxComponent {

  
  selectedName:any = undefined;
  
  //pacientes!: Paciente[];

  @Output() pacienteEmiter = new EventEmitter<Paciente>(); 
  

  constructor(private pxServicio: PacienteServicio, private modalPaciente: PacienteModalServicio, private modalTurno:TurnoModalServicio) {
  }

  pacienteValido():boolean{
    return this.selectedName != undefined;
  }

  pxPrecargado(){
    return 
  }

  ngOnInit(){
    console.log("Reinit")
    this.pxServicio.inicializar()
  }


  // ngOnInit(){
  //   this.pacientes = this.getPxList();
  // }

// getPxList(){
//     this.pxServicio.getAllPacientes().subscribe(data => {
//       this.pacientes = data
//     })
    
//     return this.pacientes
//   };

  searchName(filter: string, item: Paciente) {
    filter = filter.toLocaleLowerCase();
    return (
      ((item.apellido + " " + item.nombre + " " + item.apellido).toLocaleLowerCase() + " " + item.dni)
      .indexOf(filter) > -1
      );
  }

  enviarPaciente(paciente: Paciente){
    this.pacienteEmiter.emit(paciente)
  }

  agregarPaciente(){
    this.modalPaciente.switchModal()
  }

  setSelectedName(px:any){
    this.selectedName = px;
  }

  get pacientes():Paciente[]{
    return this.pxServicio.pacientesList
  }

}

