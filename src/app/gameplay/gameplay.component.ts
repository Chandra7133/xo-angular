import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../utils/api-manager.service';
import { LsService } from '../utils/ls.service';
import { Constants } from '../utils/constants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.css'
})
export class GameplayComponent implements OnInit {

  gameId: string = '';
  symbol: string = '';
  gameplay: any = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  constructor(private api: ApiManagerService, private ls: LsService, private route: Router) { }

  ngOnInit(): void {
    let data: any = this.ls.getItem('data');
    data = JSON.parse(data);
    console.log(data)
    this.gameId = data['gameId'];
    if (!this.gameId) {
      this.route.navigate(['gameid'])
    }
    this.symbol = data['sym'];
    this.getGamePlay();
  }

  getGamePlay() {
    let params = { gameId: this.gameId };
    this.api.doPost(Constants.URl + 'gameplay/getData', params).subscribe({
      next: (res: any) => {
        if (res['status']) {
          this.gameplay = res['data'];
        }
        else {
          alert(res['msg']);
          this.route.navigate(['gameid'])
        }
      }
    })
  }

  sendGamePlay(i: any, j: any) {
    if (this.gameplay[i][j] == 0) {
      this.gameplay[i][j] = this.symbol;
    }
    else {
      return
    }
    let params = { gameId: this.gameId, gameplay: this.gameplay };
    this.api.doPost(Constants.URl + 'gameplay/sendData', params).subscribe({
      next: (res: any) => {
        if (res['status']) {
          this.getGamePlay();
        }
        else {
          alert(res['msg']);
        }
      }
    })
  }

}
