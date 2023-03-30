import { Injectable } from "@angular/core";
import { Turno } from '../../clases/turno';


@Injectable({
    providedIn: 'root'
})
export class TurnoModalServicio {

    private modalVisible: boolean = false

    private turnoPrecargado: any;


    async switchModal(turno: any = undefined) {
        
        if(turno == undefined){
            this.turnoPrecargado = undefined;
        }

        this.cambiarEstado()
    }
    
    private cambiarEstado() {
        this.modalVisible = !this.modalVisible;
    }

    getModal(): boolean {
        return this.modalVisible
    }

    tieneTurnoPrecargado() {
        return this.turnoPrecargado != undefined
    }

    getTurnoPrecargado() {
        return this.turnoPrecargado
    }

    preCargarTurno(turno:Turno){
        this.turnoPrecargado = turno;
    }


}