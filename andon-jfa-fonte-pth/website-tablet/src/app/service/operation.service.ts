import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../model/operation/operation';
import { Nodemcu } from '../model/nodemcu';
import { Main } from '../model/main';
import { Realizado } from '../model/realizado';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Authorization': 'Bearer meu-token-de-autenticacao',
  'Content-Type': 'application/json',
});


@Injectable({
  providedIn: 'root'
})

export class OperationService {

  constructor(private http: HttpClient) { }


  get(name: string): Observable<Operation> {
    return this.http.get<Operation>(environment.url + "operation/" + name)
  }

  post(body: Nodemcu): Observable<Nodemcu> {
    return this.http.patch<Nodemcu>(environment.url + "nodemcu/" + body.nameId.name, body)

  }

  getByName(name: string){
    return this.http.get<Nodemcu>(environment.url + "nodemcu/" + name)
  }

  getTCimposto(): Observable<Main[]> {
    return this.http.get<Main[]>(environment.url + "main")
  }

  atualizar(id: number, tempo: boolean) :Observable<any>{
    return this.http.get<any>(environment.url + "contadores/" + id + "/" + tempo)
  }
  getTempo(id: number){
    return this.http.get<any>(environment.url + "contadores/" + id)
  }

  atualizarState(name: string, state: string){
    this.http.get(environment.url + "nodemcu/atualizarState/" + name + "/" + state).subscribe();
  }

  getRealizadoHoraria(name: string): Observable<Realizado>{
    return this.http.get<Realizado>(environment.url + "realizadoHorariaTablet/" + name)
  }

  atualizarOcupado(name: string, ocupado: boolean): Observable<Operation>{
    return this.http.get<Operation>(environment.url + `operation/${name}/${ocupado}`)
  }

  changeAnalise(nome: string, analise: boolean){
    this.http.get(environment.url + "" + "operation/analise/" + nome + "/" + analise).subscribe()
  }
  getAll(): Observable<Operation[]>{
    return this.http.get<Operation[]>(environment.url + "operation")
  }
  changeAjuda(name: string){
    this.http.get(environment.url + "nodemcu/ajuda/" + name).subscribe()
  }
  changeTimeExcess(name: string){
    this.http.get(environment.url + "nodemcu/timeExcess/" + name).subscribe()
  }

}
