import { Component, OnInit } from '@angular/core';
import {Players} from '../../interface/players';
import {Matches} from '../../interface/match';
import {PlayersService} from '../../services/players/players.service';
import {MatchService} from '../../services/match/match.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {
  private match: Matches;
  private p: Players = {
    id: null,
    name: ''
  };
  matches: Matches = {
    id: null,
    winner: 0,
    created_at: ''
  };

  constructor(private playersService: PlayersService, private matchService: MatchService, private router: Router){
    const counter = 1;
    const interval = setInterval(() => {
      this.refresh();
      clearInterval(interval);

    }, 1000);
  }
  ngOnInit() {
  }
  refresh() {

    this.matchService.readMatches().subscribe((data: Matches[]) => {
      this.match = data[data.length - 1];
    });
    this.playersService.readPlayers().subscribe((data: Players[]) => {
      this.p = data[this.match.winner - 1];
    });


  }
  playAgain() {
    this.matchService.createMatch(this.matches).subscribe((data) => {


      },
      (error) => {
        console.log(error);
        alert('Ocurrió un error');

      });
    this.router.navigate(['match']);
  }
  redirection() {
    this.router.navigate(['scores']);
  }
}
