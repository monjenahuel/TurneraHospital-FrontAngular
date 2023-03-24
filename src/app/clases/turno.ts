export class Turno{
    id:number;
    idPX:number;
    idProfEsp:number;
    nombrePX:string;
    apellidoPX:string;
    dniPX:string ;
    profesional:string;
    especialidad:string; 
    fechaHora:string;

    
    constructor(
    id: number, idPX: number, idProfEsp: number, nombrePX: string, apellidoPX: string,  
    dniPX: string, profesional: string,
    especialidad: string, fechaHora: string){
    this.id = id;
    this.idPX = idPX;
    this.idProfEsp = idProfEsp;
    this.nombrePX = nombrePX;
    this.apellidoPX = apellidoPX;
    this.dniPX = dniPX;
    this.profesional = profesional;
    this.especialidad = especialidad;
    this.fechaHora = fechaHora;
}
}

export class TurnoCreable{

    id:any;
    idPX:number;
    idProf:number;
    idEsp:number;
    fechaHora:string;

    constructor(idPX:number,idEsp:number,idProf:number,fechaHora:string,id?:any){
        this.idPX = idPX;
        this.idProf= idProf;
        this.idEsp=idEsp;
        this.fechaHora=fechaHora;
        //Opcional
        this.id = id
    }

}