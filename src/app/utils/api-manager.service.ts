import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(private http : HttpClient) { }

  doPost(url : string, body : any){
    return this.http.post(url,body);
  }
}
