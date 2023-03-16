import { Component, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../clases/paciente';
import { Especialidad } from '../clases/especialidad';
import { EspecialidadServicio } from '../Servicios/especialidad-servicio';
import { Profesional } from '../clases/profesional';
import { ProfesionalServicio } from '../Servicios/profesional-servicio';
import { Turno, TurnoCreable } from '../clases/turno';
import { TurnoServicioServicio } from '../Servicios/turno-servicio';
import { HORARIO_DISPONIBLE } from 'src/config/config';
import { TurnoModalServicio } from '../modales/new-turn-modal/new-turn-modal.servicio';
import Swal from 'sweetalert2';
import { PacienteServicio } from '../Servicios/pacientes-servicio';
import { SearchSelectPxComponent } from '../search-select-px/search-select-px.component';


@Component({
  selector: 'app-registrar-turno',
  templateUrl: './registrar-turno.component.html',
  styleUrls: ['./registrar-turno.component.css']
})
export class RegistrarTurnoComponent {

  horarioDispobible = HORARIO_DISPONIBLE

  @Output() selectedName: any;

  //Comunicacion Padre e hijo
  @ViewChild(SearchSelectPxComponent) buscador: SearchSelectPxComponent;


  especialidadSeleccionada: string = "";

  profesionalSeleccionado: string = "";

  fechaSeleccionada: string = "";

  horaSeleccionada: string = "";


  formInvalido() {


    return this.especialidadSeleccionada == "" ||
      !this.selectedName ||
      this.profesionalSeleccionado == "" ||
      this.fechaInvalida() ||
      this.horaInvalida()


  }

  fechaInvalida() {
    let añoSelec = parseInt(this.fechaSeleccionada.split('-')[0])
    let mesSelec = parseInt(this.fechaSeleccionada.split('-')[1])
    let diaSelec = parseInt(this.fechaSeleccionada.split('-')[2])

    let fechaActual = new Date();
    let añoActual = fechaActual.getFullYear();
    let mesActual = fechaActual.getMonth() + 1;
    let diaActual = fechaActual.getDate();

    //let fechaSelecParsed = new Date(22,10,2023)
    //console.log(fechaSelecParsed)



    return this.fechaSeleccionada == "" ||
      añoSelec < añoActual ||
      añoSelec > añoActual + 1 ||
      (añoSelec == añoActual && mesSelec < mesActual) ||
      (añoSelec == añoActual && mesSelec == mesActual && diaSelec < diaActual)
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
    return this.especialidadSeleccionada == "";
  }

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private espServicio: EspecialidadServicio,
    private profServicio: ProfesionalServicio,
    private turnoServicio: TurnoServicioServicio,
    private pxServicio: PacienteServicio,
    private modal: TurnoModalServicio) { }

  pacientes: Paciente[] = []

  especialidades: Especialidad[] = []

  profesionales: Profesional[] = []


  ngOnInit() {


    this.cargarEspecialidades()

    this.cargarProfesionales(null)

    console.log("Modal con dato:",this.modalConDato())

    if (this.modalConDato()) {

      let turno: Turno = this.modal.getTurnoPrecargado()
      let dniPaciente = turno.dniPX

      console.log({ turno })

      this.pxServicio.getAllPacientes().subscribe(data => {
        let arrayPacientes = data

        let px = arrayPacientes.filter((p: { dni: string; }) => p.dni == dniPaciente)[0];

        this.buscador.setSelectedName(px);

        ////////////////////////////

        let nombreEsp = turno.especialidad;
        let esp = this.especialidades.filter(e => e.nombre == nombreEsp)[0]
        this.especialidadSeleccionada = String(esp.id);

        ////////////////////////////////

        let nombreProf = turno.profesional.split(".", 2)[1]
      this.profServicio.getProfesionalesConEspecialidad(parseInt(this.especialidadSeleccionada)).subscribe(data =>{
        let lista = data
        this.profesionales = []

        lista.forEach(e => {
          this.profesionales.push(this.profServicio.transformToProf(e))
        })

        let prof = this.profesionales.filter(p => nombreProf.includes(p.apellido))[0]

        this.profesionalSeleccionado = String(prof.id);

        ///////////////////////////////////////////

        this.fechaSeleccionada = turno.fechaHora.split(" ", 2)[0];

        this.horaSeleccionada = turno.fechaHora.split(" ", 2)[1];

      })
        
      })

    }
  }

  modalConDato(){
    return this.modal.tieneTurnoPrecargado()
  }


  cargarEspecialidades(): Especialidad[] {
    this.espServicio.getAllEspecialidades().subscribe(data => {
      this.especialidades = data
    })

    return this.especialidades
  };

  cargarProfesionales(evento: any){
    this.profesionalSeleccionado = ""; //REVISAR
    let idEsp;
    let genericList;

    if (evento) {
      idEsp = evento.target.value

      this.profServicio.getProfesionalesConEspecialidad(idEsp).subscribe(data => {
        genericList = data
        this.profesionales = []

        genericList.forEach(e => {
          this.profesionales.push(this.profServicio.transformToProf(e))
        })

        //Manejo de errores en el front
        try {
          this.profesionalSeleccionado = String(this.profesionales[0].id) //Se deja como seleccionado el primer valor de la lista
        } catch (error) {
          console.log(new Error("No se encuentran profesionales con esa especialidad"))
        }

      })
    }
  }


  obtenerPacienteSelect(paciente: Paciente) {
    this.selectedName = paciente;
  }

  reiniciarForm() {

    this.selectedName = undefined;

    this.especialidadSeleccionada = "";

    this.profesionalSeleccionado = "";

    this.fechaSeleccionada = "";

    this.horaSeleccionada = "";


  }


  //Usando template Driven
  crearTurno(formNewTurn: any) {
    console.log("Creando turno")
    let fechaHora = formNewTurn.form.value.fecha + " " + formNewTurn.form.value.hora


    let turno = new TurnoCreable(
      this.selectedName.id,
      parseInt(formNewTurn.form.value['especialidad']),
      parseInt(formNewTurn.form.value['profesional']),
      fechaHora
    )

    this.turnoServicio.addTurno(turno).subscribe(response => {
      console.log(response);

      this.reiniciarForm()

      this.modal.switchModal();

      Swal.fire({
        icon: 'success',
        title: 'Turno creado con exito',
        showConfirmButton: false,
        timer: 1500
      })


    })

    console.log(turno)


  }

}

