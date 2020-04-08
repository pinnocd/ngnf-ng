import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as myGlobals from 'globals';

@Injectable({
  providedIn: 'root'
})

export class ApiUpdateService {
  constructor(private httpClient: HttpClient) { }

  // 
  updateApp(){
    return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/update/updApp_model.php`)
    }

}
