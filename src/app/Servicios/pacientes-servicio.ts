import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../clases/paciente';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PacienteServicio {

    private _pacientesList:Paciente[] = []
    private _pacientesPreCargados: Paciente[] = []

    constructor(private http: HttpClient) { 
    }

    
    url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/paciente'


    inicializar(){
        this.getAllPacientes().subscribe(data => {
            this._pacientesList = data
            this._pacientesPreCargados = data
        })
    }
    
    getAllPacientes():Observable<Paciente[]>{
        return this.http.get<Paciente[]>(this.url);
    }

    deletePaciente(id:number){
        return this.http.delete<Paciente>(this.url + "/" + id)
    }

    editPaciente(paciente:Paciente):Observable<Paciente>{
        return this.http.put<Paciente>(this.url +"/"+paciente.id,paciente)
    }

    addPaciente(paciente:Paciente):Observable<Paciente>{
        return this.http.post<Paciente>(this.url,paciente)
    }

    get pacientesList(){
        return this._pacientesList
    }

    set pacientesList(pacientes){
        this._pacientesList = pacientes
    }

    get pacientesPreCargados(){
        return this._pacientesPreCargados
    }

    set pacientesPreCargados(pacientes){
        this._pacientesPreCargados = pacientes
    }

    eliminarPacienteDelArray(paciente:Paciente){
        let index = this._pacientesList.indexOf(paciente)
        this._pacientesList.splice(index,1)
    }

    agregarPacienteAlArray(paciente:Paciente){
        this._pacientesList.push(paciente);
    }

    editarPacienteDelArray(paciente:Paciente){
        this._pacientesList.forEach((px,i) => {
            if(px.id == paciente.id){
                this._pacientesList[i] = paciente
            }
        })
    }



}