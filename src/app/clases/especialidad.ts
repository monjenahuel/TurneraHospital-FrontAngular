export class Especialidad{
    id!:number;
    nombre!:string;

    constructor(nombre:string,id?:any){
        this.nombre = nombre;
        this.id = id;
    }
}