import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {

  constructor() { }
  static readonly URl  : string = 'http://192.168.0.51:4207/';
}
