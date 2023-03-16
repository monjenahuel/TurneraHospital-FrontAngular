import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../clases/paciente';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PacienteServicio {

    //pacientes = this.getAllPacientes();

    constructor(private http: HttpClient) { 
    }

    
    url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/paciente'



    getAllPacientes():Observable<any>{
        return this.http.get<Paciente[]>(this.url);
    }

}