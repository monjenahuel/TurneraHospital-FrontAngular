import { Component, Output, ViewChild } from '@angular/core';
import { HORARIO_DISPONIBLE } from 'src/config/config';
import Swal from 'sweetalert2';
import { DIAS_DISPONIBLES } from '../../config/config';
import { Paciente } from '../clases/paciente';
import { Profesional } from '../clases/profesional';
import { Turno } from '../clases/turno';
import { PacienteModalServicio } from '../modales/new-paciente-modal/new-paciente-modal-servicio';
import { TurnoModalServicio } from '../modales/new-turn-modal/new-turn-modal.servicio';
import { SearchSelectPxComponent } from '../search-select-px/search-select-px.component';
import { EspecialidadServicio } from '../Servicios/especialidad-servicio';
import { PacienteServicio } from '../Servicios/pacientes-servicio';
import { ProfesionalServicio } from '../Servicios/profesional-servicio';
import { TurnoServicio } from '../Servicios/turno-servicio';
import { Especialidad } from '../clases/especialidad';


@Component({
  selector: 'app-registrar-turno',
  templateUrl: './registrar-turno.component.html',
  styleUrls: ['./registrar-turno.component.css']
})
export class RegistrarTurnoComponent {

  horarioDispobible = HORARIO_DISPONIBLE

  diasDisponibles = DIAS_DISPONIBLES

  @Output() selectedName: any;

  //Comunicacion Padre e hijo
  @ViewChild(SearchSelectPxComponent) buscador: SearchSelectPxComponent;



  especialidadSeleccionada: any;

  profesionalSeleccionado: Profesional;

  fechaSeleccionada: string = "";

  horaSeleccionada: string = "";


  formInvalido() {

    return this.especialidadInvalida() ||
      !this.selectedName ||
      this.profesionalSeleccionado == undefined ||
      this.fechaInvalida() ||
      this.horaInvalida()


  }

  fechaInvalida() {
    let añoSelec = parseInt(this.fechaSeleccionada.split('-')[0])
    let mesSelec = parseInt(this.fechaSeleccionada.split('-')[1])
    let diaSelec = parseInt(this.fechaSeleccionada.split('-')[2])
    
    let fechaSelecParsed = new Date(this.fechaSeleccionada + " " + "15:00") //el 15:00 es para evitar problemas con las fechas a las 00:00
    
    let diaDeLaSemanaSelec = fechaSelecParsed.getDay();

    let fechaActual = new Date();
    let añoActual = fechaActual.getFullYear();
    let mesActual = fechaActual.getMonth() + 1;
    let diaActual = fechaActual.getDate();

  
    return this.fechaSeleccionada == "" ||
      añoSelec < añoActual ||
      añoSelec > añoActual + 1 ||
      (añoSelec == añoActual && mesSelec < mesActual) ||
      (añoSelec == añoActual && mesSelec == mesActual && diaSelec < diaActual) ||
      diaDeLaSemanaSelec == 6 ||
      diaDeLaSemanaSelec == 0
  }

  horaInvalida() {
    let hora = parseInt(this.horaSeleccionada.split(":")[0])
    let minutos = parseInt(this.horaSeleccionada.split(":")[1])

    let horaDeCierre = parseInt(HORARIO_DISPONIBLE.split("-")[1].split(":")[0])
    let horaDeApertura = parseInt(HORARIO_DISPONIBLE.split("-")[0].split(":")[0])

    return this.horaSeleccionada == "" ||
      hora < horaDeApertura ||
      hora >= horaDeCierre + 1 ||
      (hora == horaDeCierre && minutos > 0)

  }

  especialidadInvalida(){
    return this.especialidadSeleccionada == null;
  }

  constructor(
    private espServicio: EspecialidadServicio,
    private profServicio: ProfesionalServicio,
    private turnoServicio: TurnoServicio,
    private pxServicio: PacienteServicio,
    private modal: TurnoModalServicio,
    private modalPaciente: PacienteModalServicio) { }

  profesionales: Profesional[];

  ngOnInit() {


    if (this.modalConDato()) {


      let turno = this.modal.getTurnoPrecargado()

      console.log("Turno com",turno)

      if(turno != undefined){
        
        let dniPaciente = turno.paciente.dni

          this.pxServicio.getAllPacientes().subscribe(data => {
            let arrayPacientes = data
    
            let px = arrayPacientes.filter((p: { dni: string; }) => p.dni == dniPaciente)[0];
    
            this.buscador.setSelectedName(px); //Valor Mostrado en el input
            this.selectedName = px; //Valor real del formulario

          })
  

          let especialidadElegida = this.espServicio.especialidadesList.find(esp => esp.id == turno.especialidad.id)

          if(especialidadElegida != undefined){
            this.especialidadSeleccionada = especialidadElegida;
          }
  
          ///////////////////////////
  
          //to do: revisar
          this.cargarProfesionales()
  
          this.profServicio.getProfesionalesConEspecialidad(this.especialidadSeleccionada.id).subscribe(data =>{
          this.profesionales = data
        
          let prof = data.find(p => p.id == turno.profesional.id)
  
          if(prof != undefined){
            this.profesionalSeleccionado = prof;  
          }else{
            this.profesionalSeleccionado = this.profesionales[0]
          }        
  
          ///////////////////////////////////////////
  
          this.fechaSeleccionada = turno.fechaHora.split("T", 2)[0];
  
          this.horaSeleccionada = turno.fechaHora.split("T", 2)[1];
          
      
        })
      }else{
        console.log("FALLO AL CARGAR TURNO")
      }


    }
  }

  modalConDato(){
    return this.modal.tieneTurnoPrecargado()
  }



  cargarProfesionales(evento?: any){
    let idEsp;

    if (evento) {
      idEsp = this.especialidadSeleccionada.id

      this.profServicio.getProfesionalesConEspecialidad(idEsp).subscribe(data => {
        this.profesionales = data
    
        try {
          //Se deja como seleccionado el primer valor de la lista
          this.profesionalSeleccionado = this.profesionales[0] 
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: "No se encuentran profesionales con esa especialidad",
            showConfirmButton: false,
            timer: 1500
          })
        }

      })
    }
  }



  obtenerPacienteSelect(paciente: Paciente) {
    this.selectedName = paciente;
  }

  reiniciarForm() {
    this.ngOnInit()
  }


  crearTurno(formNewTurn: any) {
    let fechaHora = formNewTurn.form.value.fecha + "T" + formNewTurn.form.value.hora

    console.log(formNewTurn)
    
    if (!this.modalConDato()){
      
        let turno = new Turno(
          this.selectedName,
          this.especialidadSeleccionada,
          this.profesionalSeleccionado,
          fechaHora
        )

        console.log("Turno a enviar",turno)
        this.turnoServicio.addTurno(turno).subscribe(response => {

          this.turnoServicio.actualizarListaDeTunors();
    
          this.reiniciarForm()
          
          Swal.fire({
            icon: 'success',
            title: 'Turno creado con exitos',
            showConfirmButton: false,
            timer: 1500
          })
  
    
        },error => {
          Swal.fire({
            icon: 'error',
            title: error.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
      
    }else{
      

      let idTurnoPreCargado = this.modal.getTurnoPrecargado().id;


      let turno = new Turno(
      this.selectedName,
      this.especialidadSeleccionada,
      this.profesionalSeleccionado,
      fechaHora,
      idTurnoPreCargado
    )

    console.log("turno",turno)

    this.turnoServicio.editTurno(turno).subscribe(response => {
      this.turnoServicio.actualizarListaDeTunors(); //Reiniciar array de turnos

      this.reiniciarForm()

      Swal.fire({
        icon: 'success',
        title: 'Turno modificado con éxito',
        showConfirmButton: false,
        timer: 1500
      })

      })

    }

    this.modal.switchModal();

  }


  agregarPaciente(){
    this.modalPaciente.switchModal()
  }

  modalPacienteIsOpen(){
    return this.modalPaciente.getModal()
  }

  get especialidades(){
    return this.espServicio.especialidadesList;
  }

  get pacientes(){
    return this.pxServicio.pacientesList;
  }


}

