export class Paciente{
    id!:number;
    nombre!:string;
    apellido!:string;
    email!:string;
    dni!:string;
    telefono!:string;

    constructor(apellido:string,nombre:string,dni:string){
        this.apellido = apellido
        this.nombre = nombre
        this.dni = dni
    }
}