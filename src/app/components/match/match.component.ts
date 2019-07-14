import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {PlayersService} from '../../services/players/players.service';
import {MatchService} from '../../services/match/match.service';
import {RoundsService} from '../../services/rounds/rounds.service';
import {Players} from '../../interface/players';
import {Rounds} from '../../interface/rounds';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {timer, Observable, Subject, Subscription} from 'rxjs';
import {switchMap, takeUntil, catchError} from 'rxjs/operators';
import {Matches} from '../../interface/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  private match: Matches;
  private wins1 = 0;
  private wins2 = 0;
  private roundsp;
  private player1m = 0;
  private player2m = 0;
  private msj = '';
  private timer;
  private sub: Subscription;
  private dataApi: Players[];
  private dataRounds: Rounds[];
  private p1: Players = {
    id: null,
    name: ''
  };
  private p2: Players = {
    id: null,
    name: ''
  };

  PHP_API_SERVER = 'http://127.0.0.1:8000';

  constructor(private playersService: PlayersService, private matchService: MatchService, private roundsService: RoundsService, private httpClient: HttpClient, private router: Router) {
    const counter = 1;
    const interval = setInterval(() => {
      this.refresh();
      clearInterval(interval);

    }, 2000);
  }

  rounds: Rounds = {
    id: null,
    p1_move: null,
    p2_move: null,
    round_number: null,
    p1_id: null,
    p2_id: null,
    match_id: null,
    created_at: null,
    updated_at: null,
  };
  matches: Matches = {
    id: null,
    winner: 0,
    created_at: null
  };

  ngOnInit() {
    this.roundsp = 1;

  }

  game(option: number) {

    if (this.player1m === 0) {
      if (this.msj === this.p1.name + ' Play') {
        this.msj = this.p2.name + ' Play';
      } else {
        this.msj = this.p1.name + ' Play';
      }
      this.player1m = option;
    } else {
      this.msj = this.p2.name + ' Play';
      this.player2m = option;
    }

    if (this.player1m !== 0 && this.player2m !== 0) {
      this.rounds.match_id = this.match.id;
      this.rounds.p1_id = this.p1.id;
      this.rounds.p2_id = this.p2.id;
      this.rounds.p1_move = this.player1m;
      this.rounds.p2_move = this.player2m;
      this.rounds.round_number = this.roundsp;
      this.createRound();
      this.roundsp = this.roundsp + 1;


      if (this.player1m === this.player2m) {
        this.msj = this.p1.name + ' and ' + this.p2.name + ' Draw!';
      }
      if (this.player1m === 1 && this.player2m === 2) {
        this.wins2 = this.wins2 + 1;
        this.msj = this.p2.name + ' Wins this round!';
      }
      if (this.player1m === 1 && this.player2m === 3) {
        this.wins1 = this.wins1 + 1;
        this.msj = this.p1.name + ' Wins this round!';
      }
      if (this.player1m === 2 && this.player2m === 1) {
        this.wins1 = this.wins1 + 1;
        this.msj = this.p1.name + ' Wins this round!';
      }
      if (this.player1m === 2 && this.player2m === 3) {
        this.wins2 = this.wins2 + 1;
        this.msj = this.p2.name + ' Wins this round!';
      }
      if (this.player1m === 3 && this.player2m === 1) {
        this.wins2 = this.wins2 + 1;
        this.msj = this.p2.name + ' Wins this round!';
      }
      if (this.player1m === 3 && this.player2m === 2) {
        this.wins1 = this.wins1 + 1;
        this.msj = this.p1.name + ' Wins this round!';
      }
      this.player1m = 0;
      this.player2m = 0;
      if (this.wins1 === 3) {
        this.match.winner = this.p1.id;
        this.updateMatch();
        this.router.navigate(['decision']);
      }
      if (this.wins2 === 3) {
        this.match.winner = this.p2.id;
        this.updateMatch();
        this.router.navigate(['decision']);
      }
    }
  }

  createRound() {
    this.roundsService.createRounds(this.rounds).subscribe((data) => {

      },
      (error) => {
        console.log(error);
        alert('Ocurrió un error');

      });
  }

  updateMatch() {
    this.matchService.put(this.match, this.match.id).subscribe((data) => {

      },
      (error) => {
        console.log(error);
        alert('Ocurrió un error');

      });
  }

  refresh() {
    this.playersService.readPlayers().subscribe((data: Players[]) => {
      this.dataApi = data;

      this.p2 = this.dataApi[this.dataApi.length - 1];
      this.p1 = this.dataApi[this.dataApi.length - 2];
      this.msj = this.p1.name + ' Play';

    });
    this.matchService.readMatches().subscribe((data: Matches[]) => {

      this.match = data[data.length - 1];
    });
  }
}
