import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LsService {

  constructor() { }

  setItem(key : any,data : any){
    localStorage.setItem(key,data);
  }

  getItem(key : any){
    return localStorage.getItem(key);
  }
}
