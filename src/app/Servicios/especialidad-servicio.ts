import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Especialidad } from '../clases/especialidad';

@Injectable({
    providedIn: 'root'
})

export class EspecialidadServicio {

    // especialidades = this.getAllEspecialidades();

    constructor(private http: HttpClient) { 
    }

    
    url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/especialidad'

    getAllEspecialidades():Observable<any>{
        return this.http.get<Especialidad[]>(this.url);
    }

}