import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiManagerService } from '../utils/api-manager.service';
import { Constants } from '../utils/constants.service';
import { Router } from '@angular/router';
import { LsService } from '../utils/ls.service';
import { SocketService } from '../utils/socket.service';

@Component({
 selector: 'app-gameid',
 standalone: true,
 imports: [FormsModule],
 templateUrl: './gameid.component.html',
 styleUrl: './gameid.component.css'
})
export class GameidComponent implements OnInit{
 is_host: boolean = false;
 is_join: boolean = false;
 generatedCode : string = '';
 playersCount : number = 0;
 host_response : boolean = false;

constructor(private api : ApiManagerService,private route: Router,private ls :LsService,private socket : SocketService){}
  ngOnInit(): void {
    this.socket.socketConnect();
    this.setCount();
    this.startGame();
  }

  setCount(){
    this.socket.getplayerCount().subscribe({
      next:(res:any)=>{
        if(res){
          this.playersCount = res['count']
        }
      }
     })
  }

  startGame(){
    this.socket.gamestarted().subscribe({
      next:(res:any)=>{
        if(res){
         this.route.navigate(['gameplay']);
        }
      }
    })
  }

 generateGameId(){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  this.generatedCode =  code;
  this.createGame();
 }

 createGame(){
  let params = { gameId : this.generatedCode};
  this.api.doPost(Constants.URl+'gameId/generate',params).subscribe({
   next:(res:any)=>{
    if(res['status']){
      alert(res['msg']);
      this.socket.addPlayer(this.generatedCode);
    }
   }
  })
 }

 joinGame(){
  let params = { gameId : this.generatedCode};
  this.api.doPost(Constants.URl+'gameId/join',params).subscribe({
   next:(res:any)=>{
    if(res['status']){
      alert(res['msg']);
      this.socket.addPlayer(this.generatedCode);
      let data = JSON.stringify({'sym':'O',"gameId":this.generatedCode});
      this.ls.setItem('data',data);
      // this.route.navigate(['gameplay']);
      this.host_response = true;
    }
    else{
      alert(res['msg']);
    }
   }
  })
 }

 getPlayerCount(){
  let params = { gameId : this.generatedCode};
  this.api.doPost(Constants.URl+'gameId/count',params).subscribe({
   next:(res:any)=>{
    if(res['status']){
      this.playersCount = res['count'];
    }
    else{
      alert(res['msg']);
    }
   }
  })
 }

 gameStart(){
  if(this.playersCount <2){
    alert('please wait for other player')
    return
  }
  this.socket.startGame(this.generatedCode);
  let data = JSON.stringify({'sym':'X',"gameId":this.generatedCode});
  this.ls.setItem('data',data);
  this.route.navigate(['gameplay']);
 }
}

