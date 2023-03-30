import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from '../../config/config';
import { Especialidad } from '../clases/especialidad';
import { Profesional } from '../clases/profesional';



@Injectable({
    providedIn: 'root'
})
export class ProfesionalServicio {

    constructor(private http: HttpClient) {
    }

    ngOnInit(){
        this.getAllProfesionales()
        this.getProfesionalesConEspecialidad(1)
    }


    url = BASE_URL + '/profesionales'

    getAllProfesionales(): Observable<Profesional[]> {
        return this.http.get<Profesional[]>(this.url);
    }
    
    getProfesionalesConEspecialidad(idEsp: number):Observable<Profesional[]>{
        let url = this.url + "/especialidad/" + idEsp
        return this.http.get<Profesional[]>(url)
    }
    

}