import { Paciente } from './paciente';
import { Especialidad } from './especialidad';
import { Profesional } from './profesional';

export class Turno{
    id:number;
    fechaHora:string;
    paciente:Paciente;
    especialidad:Especialidad;
    profesional:Profesional;

    constructor(
    paciente:Paciente,especialidad:Especialidad,profesional:Profesional, fechaHora: string,id?:any){
    this.paciente = paciente;
    this.especialidad = especialidad;
    this.profesional = profesional;
    this.fechaHora = fechaHora;
    this.id = id;
}
}
