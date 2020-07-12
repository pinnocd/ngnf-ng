import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as myGlobals from 'globals';

@Injectable({
  providedIn: 'root'
})

export class ApiDeleteService {
    constructor(private httpClient: HttpClient) { }

    deleteApplication(ApplicationId){
        let params = new HttpParams().set('ApplicationId', ApplicationId);
        return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/delete/delApplication.php`, { params: params} )
    }

    deleteFundProvider(FundProviderCode){
      let params = new HttpParams().set('FundProviderCode', FundProviderCode);
      return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/delete/delFundProvider.php`, { params: params} )
    }
}

