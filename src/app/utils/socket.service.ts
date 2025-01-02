import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Constants } from './constants.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket | null = null;
  private getCount = new BehaviorSubject<any>(null);
  private start = new BehaviorSubject<any>(null);
  private move = new BehaviorSubject<any>(null);

  constructor() { 

  }
  socketConnect() {
    if (!this.socket || !this.socket?.connected) { 
      this.socket = io(Constants.URl);

      this.socket.on('connected', (data) => {
        console.log('Socket connected:',data);
        console.log('Socket connection attempt:', this.socket);
      });

      this.socket.on('count',(data)=>{
        this.getCount.next(data);
      })

      this.socket.on('started',(data)=>{
        this.start.next(data);
      })

      this.socket.on('moved',(data)=>{
        this.move.next(data);
      })
    
    }
  }

  addPlayer(gameId : string){
    if (this.socket) {
      this.socket.emit('add',{'gameId':gameId});
    }
  }

  getplayerCount(){
    return this.getCount.asObservable();
  }

  startGame(gameId : string){
    if (this.socket) {
      this.socket.emit('start',{'gameId':gameId});
    }
  }

  gamestarted(){
    return this.start.asObservable();
  }

  setMove(gameId : string){
    console.log(gameId)
    if (this.socket) {
      this.socket.emit('move',{'gameId':gameId});
    }
  }

  moved(){
    return this.move.asObservable();
  }

  // // Optional: Method to handle disconnection
  // socketDisconnect() {
  //   if (this.socket) {
  //     this.socket.disconnect();
  //     console.log('Socket disconnected:', this.socket);
  //   }
  // }

  // // Optional: Method to check if socket is connected
  // isConnected(): boolean {
  //   // Using optional chaining to safely check connected status
  //   return this.socket?.connected ?? false;  // Default to false if socket is null
  // }


  // Register the socket events after connection is established
        // (this.socket as Socket).on('test', (data) => {
        //   console.log('Received some-event:', data);
        // });

        // You can add more event listeners here as needed
        // (this.socket as Socket).on('another-event', (data) => {
        //   console.log('Received another-event:', data);
        // });

         // Handle connection errors
      // this.socket.on('connect_error', (error) => {
      //   console.error('Connection error:', error);
      // });

      // Log the connection attempt for debugging
}
