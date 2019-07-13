import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Rounds} from "../../interface/Rounds";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoundsService {
  PHP_API_SERVER = "http://127.0.0.1:8000";

  constructor(private httpClient: HttpClient) { }

  readRounds(): Observable<Rounds[]>{
    return this.httpClient.get<Rounds[]>(`${this.PHP_API_SERVER}/api/rounds`);
  }

  createRounds(rounds: Rounds){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.PHP_API_SERVER + '/api/rounds', rounds, {headers:headers});
  }

}
