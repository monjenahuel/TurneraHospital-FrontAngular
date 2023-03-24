import { Injectable } from "@angular/core";
import { Turno } from '../../clases/turno';


@Injectable({
    providedIn: 'root'
})
export class TurnoModalServicio {

    private modalVisible:boolean = false

    private turnoPrecargado:any;


    switchModal(turno:any = undefined){
        if(!turno){
            this.modalVisible = !this.modalVisible;
            this.turnoPrecargado = undefined;
            
        }else{
            this.turnoPrecargado = turno
            this.modalVisible = !this.modalVisible
        }
        
    }

    getModal():boolean{
        return this.modalVisible
    }

    tieneTurnoPrecargado(){
        return this.turnoPrecargado != undefined
    }

    getTurnoPrecargado(){
        return this.turnoPrecargado
    }


}