import { Injectable } from '@angular/core';
import { Turno, TurnoCreable } from '../clases/turno';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppTurnosComponent } from '../app-turnos/app-turnos.component';

@Injectable({
  providedIn: 'root'
})
export class TurnoServicio {

  private _turnosList:Turno[] = [];
  private _turnosPreCargados:Turno[] = []; //En vez de atributos, metodos?

  private url:string = 'http://localhost:8080/demo-1.0-SNAPSHOT/api' + "/turno"

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getTurnos().subscribe(data =>{
      this._turnosList = data
      this._turnosPreCargados = data
    })
  }

  addTurno(t:TurnoCreable):Observable<Turno>{
    return this.http.post<Turno>(this.url,
      t,
      {
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    })
  }

  editTurno(t:TurnoCreable):Observable<Turno>{
    return this.http.put<Turno>(this.url +"/"+t.id,t)
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

  editarTurnoDelArray(turno:TurnoCreable,response:Turno){
    this._turnosList.forEach((turnoDelArray,i) => {
      if(turnoDelArray.id == turno.id){
        this._turnosList[i] = response
      }
    })
  }

  eliminarTurnoDelArray(turno:Turno){
    let index = this._turnosList.indexOf(turno)
    this._turnosList.splice(index,1)
    
  }


  
}
