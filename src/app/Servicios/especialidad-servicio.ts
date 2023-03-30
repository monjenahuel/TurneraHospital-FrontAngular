import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "src/config/config";
import { Especialidad } from '../clases/especialidad';

@Injectable({
    providedIn: 'root'
})

export class EspecialidadServicio {

    private _especialidadesList:Especialidad[];

    constructor(private http: HttpClient) { 
    }

    inicializar(){
        this.getAllEspecialidades().subscribe(data =>{
            this._especialidadesList = data
        })
    }
    
    

    url = BASE_URL + '/especialidades'

    getAllEspecialidades():Observable<any>{
        return this.http.get<Especialidad[]>(this.url);
    }

    get especialidadesList():Especialidad[]{
        return this._especialidadesList
    }

    set especialidadesList(espList){
        this._especialidadesList = espList;
    }

}