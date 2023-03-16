import { Injectable } from '@angular/core';
import { Turno, TurnoCreable } from '../clases/turno';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoServicioServicio {

  private turnos:Turno[];

  private url:string = 'http://localhost:8080/demo-1.0-SNAPSHOT/api' + "/turno"

  constructor(private http: HttpClient) {}

  addTurno(t:TurnoCreable):Observable<TurnoCreable>{
    return this.http.post<TurnoCreable>(this.url,
      t,
      {
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    })
  }


  
}
