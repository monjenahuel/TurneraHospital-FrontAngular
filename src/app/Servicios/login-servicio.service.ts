import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turno } from '../clases/turno';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginServicioService {

  url = BASE_URL + "/usuarios/validar";


  constructor(private http: HttpClient) { 
  }

  validarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url,usuario)
  }

}
