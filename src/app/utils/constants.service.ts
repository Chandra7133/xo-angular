import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {

  constructor() { }
  static readonly URl  : string = 'http://localhost:4207/';
}
