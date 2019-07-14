import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import { PlayersService } from '../../services/players/players.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Players} from '../../interface/players';
import {Matches} from '../../interface/match';
import {MatchService} from '../../services/match/match.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() names = new EventEmitter<string>();
  player1: Players = {
    id: null,
    name: null
  };
  player2: Players = {
    id: null,
    name: null
  };
  matches: Matches = {
    id: null,
    winner: 0,
    created_at: ''
  };


  constructor(private playersService: PlayersService, private matchService: MatchService, private router: Router) {

  }

  PHP_API_SERVER = 'http://127.0.0.1:8000';


  ngOnInit() {


    $(document).ready(function(){
      $("#toRegister").click(function(){
        $(".register").animate({
          left: "370px"
        })
      })
    });

    $(document).ready(function(){
      $("#toLogin").click(function(){
        $(".register").animate({
          left: "-370px"
        })
      })
    });

    $(document).ready( function() {
      $(".btn-register").click( function() {
        $(".register").fadeOut("slow")
        $(".thankYou").animate({
          left: "+=600"
        })
        $(".thankYou").fadeOut(3000)
      })
    })

  }

  savePlayer() {

    this.playersService.createPlayers(this.player1).subscribe((data) => {


      },
      (error) => {
        console.log(error);
        alert('Ocurrió un error');

      });
    this.playersService.createPlayers(this.player2).subscribe((data) => {


      },
      (error) => {
        console.log(error);
        alert('Ocurrió un error');

      });
    this.saveMatch();
    this.router.navigate(['match']);
  }


  saveMatch() {

    this.matchService.createMatch(this.matches).subscribe((data) => {


      },
      (error) => {
        console.log(error);
        alert('Ocurrió un error');

      });

  }


}
