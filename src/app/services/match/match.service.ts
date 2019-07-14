import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Matches } from '../../interface/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  PHP_API_SERVER = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) { }

  readMatches(): Observable<Matches[]> {
    return this.httpClient.get<Matches[]>(`${this.PHP_API_SERVER}/api/matches`);
  }

  createMatch(matches: Matches) {
    const Headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.PHP_API_SERVER + '/api/matches', matches, {headers: Headers});
  }

  put(matches, id: number) {
    const Headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put(this.PHP_API_SERVER + '/api/matches/' + id, matches, {headers: Headers});
  }
}
