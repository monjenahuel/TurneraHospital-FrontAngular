export class Usuario{
    idUsuario:number;
    username:string;
    password:string;

    constructor(username:any,password?:any){
        this.username = username
        this.password = password
    }
}


