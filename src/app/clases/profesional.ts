export class Profesional{
    apellido:string;
    id:number;
    nombre:string;
    matricula:string;

    constructor(apellido:string,nombre:string,matricula:string,id?:any){
        this.apellido = apellido;
        this.nombre = nombre;
        this.matricula = matricula;
        this.id = id;
    }

}