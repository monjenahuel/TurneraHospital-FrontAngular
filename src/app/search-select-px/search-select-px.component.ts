import { Component, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Paciente } from '../clases/paciente';
import { PacienteServicio } from '../Servicios/pacientes-servicio';



@Component({
  selector: 'app-search-select-px',
  templateUrl: './search-select-px.component.html',
  styleUrls: ['./search-select-px.component.css']
})
export class SearchSelectPxComponent {

  
  selectedName:any = undefined;
  
  pacientes!: Paciente[];

  @Output() pacienteEmiter = new EventEmitter<Paciente>(); 
  

  constructor(private pxServicio: PacienteServicio) {
  }

  pacienteValido():boolean{
    return this.selectedName != undefined;
  }

  pxPrecargado(){
    return 
  }


  ngOnInit(){
    this.pacientes = this.getPxList();
  }

getPxList(){
    this.pxServicio.getAllPacientes().subscribe(data => {
      this.pacientes = data
    })
    
    return this.pacientes
  };

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
    console.log(this.selectedName)
    Swal.fire({
      icon: 'success',
      title: 'Turno creado con exito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  setSelectedName(px:any){
    this.selectedName = px;
  }

}

