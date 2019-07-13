import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Players} from '../../interface/players';
import { Observable } from  'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  PHP_API_SERVER = "http://127.0.0.1:8000";

  constructor(private httpClient: HttpClient) { }

  readPlayers(): Observable<Players[]>{
    return this.httpClient.get<Players[]>(`${this.PHP_API_SERVER}/api/players`);
  }

  createPlayers(players: Players){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.PHP_API_SERVER + '/api/players', players, {headers:headers});
  }

}
