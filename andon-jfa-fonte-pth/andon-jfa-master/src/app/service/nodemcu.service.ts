import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nodemcu } from '../module/nodemcu';
import { Observable } from 'rxjs';
import { Realizado } from '../module/realizado';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NodemcuService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {

    return this.http.get<Nodemcu>(
      environment.url + 'nodemcu',
    );
  }

  getAllRealizado(): Observable<Realizado[]>{
    return this.http.get<Realizado[]>(environment.url + "realizadoHoraria")
  }

  pausa(pausa: boolean){
    return this.http.get(environment.url + "operation/pausa/" + pausa)
  }

  postPausa(){
    this.http.post(environment.url+ "pausa", {}).subscribe()
  }
}
