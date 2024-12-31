import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Constants } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket | null = null;

  constructor() { 
  }
  socketConnect() {
    if (!this.socket || !this.socket?.connected) { 
      this.socket = io(Constants.URl);
      this.socket.on('connected', (data) => {
        console.log('Socket connected:',data);

        // Register the socket events after connection is established
        // (this.socket as Socket).on('test', (data) => {
        //   console.log('Received some-event:', data);
        // });

        // You can add more event listeners here as needed
        // (this.socket as Socket).on('another-event', (data) => {
        //   console.log('Received another-event:', data);
        // });
        console.log('Socket connection attempt:', this.socket);
      });

      // Handle connection errors
      // this.socket.on('connect_error', (error) => {
      //   console.error('Connection error:', error);
      // });

      // Log the connection attempt for debugging
    }
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
}
