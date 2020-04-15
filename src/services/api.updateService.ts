import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as myGlobals from 'globals';

@Injectable({
  providedIn: 'root'
})

export class ApiUpdateService {
  constructor(private httpClient: HttpClient) { }

  // 
  updateApplication(ApplicationId, Status){
    let params = new HttpParams()
                      .set('ApplicationId', ApplicationId)
                      .set('Status', Status);

    return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/update/updApp.php`, { params: params} )
    }
}
