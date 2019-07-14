import { Component, OnInit } from '@angular/core';
import {Matches} from '../../interface/match';
import {Players} from '../../interface/players';
import {PlayersService} from '../../services/players/players.service';
import {MatchService} from '../../services/match/match.service';
import {RoundsService} from '../../services/rounds/rounds.service';
import {Rounds} from '../../interface/rounds';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  private matches: any;
  private players: Players[];
  private rounds: Rounds[];
  private match: Matches;
  constructor(private playersService: PlayersService, private matchService: MatchService, private roundsService: RoundsService) { }

  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.playersService.readPlayers().subscribe((data: Players[]) => {
      this.players = data;

    });
    this.roundsService.readRounds().subscribe((data: Rounds[]) => {

      this.rounds = data;
    });
    this.matchService.readMatches().subscribe((data: Matches[]) => {

      this.matches = data;
      for(let i = 0; i < data.length; i++) {
        this.matches[i] = data[i];
        const roundsOfMatch = this.rounds.filter(x => x.match_id === this.matches[i].id);
        this.matches[i][0] = roundsOfMatch;
        let playersOfMAtch = this.players.filter(x => x.id === this.matches[i][0][0].p1_id);
        this.matches[i][1] = playersOfMAtch;
        playersOfMAtch = this.players.filter(x => x.id === this.matches[i][0][0].p2_id);
        this.matches[i][2] = playersOfMAtch;
        playersOfMAtch = this.players.filter(x => x.id === this.matches[i].winner);
        this.matches[i][3] = playersOfMAtch;
        console.log(this.matches[i]);

      }


  });



  }

}
