import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../config/config';
import { Turno } from '../clases/turno';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TurnoServicio {
  

  private _turnosList:Turno[] = [];
  private _turnosPreCargados:Turno[] = [];

  private url:string = BASE_URL + '/turnos'

  constructor(private http: HttpClient, private router: Router) {}

  actualizarListaDeTunors(){
    if(this.router.url == "/turnos"){
      this.getTurnos().subscribe(data =>{
        this._turnosList = data
        this._turnosPreCargados = data
      })
    }else{
      if(this.router.url == "/estadisticas")
      this.http.get<Turno[]>(this.url + "/history").subscribe(data => {
        this._turnosList = data
        this._turnosPreCargados = data
        console.log(this._turnosList)
      })
    }
    
  }

  addTurno(t:Turno):Observable<Turno>{
    return this.http.post<Turno>(this.url,
      t,
      {
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    })
  }

  editTurno(t:Turno):Observable<Turno>{
    let newUrl = this.url +"/"+t.id
    return this.http.put<Turno>(newUrl,t)
  }

  deleteTurno(id:number){
    return this.http.delete<Turno>(this.url + "/" + id)
  }

  getTurnos(){
    return this.http.get<Turno[]>(this.url)
  }

  get turnosList():Turno[]{
    return this._turnosList
  }

  set turnosList(listNueva){
    this._turnosList = listNueva
  }

  get turnosPreCargados():Turno[]{
    return this._turnosPreCargados
  }

  set turnosPreCargados(turnosNuevos){
    this._turnosPreCargados = turnosNuevos
  }

  agregarTurnoAlArray(response:Turno){
    this._turnosList.push(response);
    //Reordenar turnos por fecha
    this._turnosList.sort((a,b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime())
  }

  eliminarTurnoDelArray(turno:Turno){
    let index = this._turnosList.indexOf(turno)
    this._turnosList.splice(index,1)
    
  }


  
}
