import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Profesional } from '../clases/profesional';
import { Especialidad } from '../clases/especialidad';

export class EspProf {

    apellidoProf:string;
    idProf:number;
    idProfEsp:number;
    nombreEspecialidad:string;
    nombreProf:string;
}

@Injectable({
    providedIn: 'root'
})
export class ProfesionalServicio {

    EspProf:EspProf[];

    constructor(private http: HttpClient) {
    }

    ngOnInit(){
        this.getAllProfesionales()
        this.getProfesionalesConEspecialidad(1)
    }

    url = 'http://localhost:8080/demo-1.0-SNAPSHOT/api/profesional'

    getAllProfesionales(): Observable<Profesional[]> {
        return this.http.get<Profesional[]>(this.url);
    }

    getProfesionalesConEspecialidad(idEsp: number):Observable<EspProf[]>{
        let url = "http://localhost:8080/demo-1.0-SNAPSHOT/api/especialidad/" + idEsp
        
        console.log("URL:", url)
        
        return this.http.get<EspProf[]>(url)
        
            
    }


    transformToProf(espProf:EspProf):Profesional {
        // console.log(new Profesional(espProf.apellidoProf,espProf.idProf,espProf.nombreProf,"-"))
        return new Profesional(espProf.apellidoProf,espProf.idProf,espProf.nombreProf,"-");
    }

}