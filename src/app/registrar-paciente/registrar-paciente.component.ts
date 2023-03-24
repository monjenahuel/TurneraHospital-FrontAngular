import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../clases/paciente';
import { PacienteServicio } from '../Servicios/pacientes-servicio';
import { PacienteModalServicio } from '../modales/new-paciente-modal/new-paciente-modal-servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-paciente',
  templateUrl: './registrar-paciente.component.html',
  styleUrls: ['./registrar-paciente.component.css']
})
export class RegistrarPacienteComponent {
  formPX: FormGroup;


  constructor(private formBuilder: FormBuilder, private PacienteServicio: PacienteServicio, private modal:PacienteModalServicio){
    
    if(this.modal.tienePacientePrecargado()){
      let pxPrecargado = this.modal.getPacientePrecargado()

      this.buildForm(pxPrecargado)
    }else{
      this.buildForm()
    }
    
  };

  private buildForm(paciente?:Paciente) {
    this.formPX = this.formBuilder.group({
      apellido: [
        paciente?.apellido,
        [
        Validators.required,
        Validators.minLength(2)
        ]
      ],  
      nombre: [
        paciente?.nombre,
        [
        Validators.required,
        Validators.minLength(2)
        ]
      ],
      dni: [
        paciente?.dni,
        [
        Validators.required,
        Validators.min(1000000) //DNI Minimo 1.000.000
        ]
      ],
      telefono: [
        paciente?.telefono,
        [
        Validators.required,
        Validators.min(10000000)  //Telefono minimo 1000-0000
        ]
      ],
      email: [
        paciente?.email, 
        [
        Validators.required,
        Validators.email
        ]
      ]
    });
  }

  crearPx(){

    let pacienteCreado = this.formPX.value

    if (!this.modalConDato()){

      this.PacienteServicio.addPaciente(pacienteCreado).subscribe(response => {
        this.PacienteServicio.agregarPacienteAlArray(response)
        this.formPX.reset()

        Swal.fire({
          icon: 'success',
          title: 'Paciente creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      })

    }else{

      pacienteCreado.id = this.modal.getPacientePrecargado().id;

      this.PacienteServicio.editPaciente(pacienteCreado).subscribe(response => {
        this.PacienteServicio.editarPacienteDelArray(response)
        this.formPX.reset()

        Swal.fire({
          icon: 'success',
          title: 'Paciente editado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
    
    this.modal.switchModal()
  }

  
  modalConDato(){
    return this.modal.tienePacientePrecargado()
  }


}
