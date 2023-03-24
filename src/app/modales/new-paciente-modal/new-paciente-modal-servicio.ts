import { Injectable } from "@angular/core";
import { Turno } from '../../clases/turno';


@Injectable({
    providedIn: 'root'
})
export class PacienteModalServicio {

    private modalVisible:boolean = false

    private pacientePrecargado:any;


    switchModal(paciente:any = undefined){
        if(!paciente){
            this.modalVisible = !this.modalVisible;
            this.pacientePrecargado = undefined;
            
        }else{
            this.pacientePrecargado = paciente
            this.modalVisible = !this.modalVisible
        }
        
    }

    getModal():boolean{
        return this.modalVisible
    }

    tienePacientePrecargado(){
        return this.pacientePrecargado != undefined
    }

    getPacientePrecargado(){
        return this.pacientePrecargado
    }


}