import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from  'rxjs';
import * as myGlobals from 'globals';

import { App_model } from  '../models/App_model';
import { Org_model } from  '../models/Org_model';
import { Con_model } from  '../models/Con_model';
import { Gen_model } from  '../models/Gen_model';
import { Bac_model } from  '../models/Bac_model';
import { Fin_model } from  '../models/Fin_model';

@Injectable({
  providedIn: 'root'
})

export class ApiReadService {
  constructor(private httpClient: HttpClient) { }

  // ************************  START READ Functions  ************************ 
  // Retrieve All Applications for the specific user
  readApplications(UserId): Observable<App_model[]>{
    let params = new HttpParams().set('UserId', UserId);
    return this.httpClient.get<App_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getApplications.php`, { params: params} );
  }

  // Retrieve All Applications for the specific user
  readAllApps(): Observable<App_model[]>{
    return this.httpClient.get<App_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getApplications.php`);
  }

  // Retrieve All Organisation model data
  readOrg_models(): Observable<Org_model[]>{
    return this.httpClient.get<Org_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getOrg_model.php`);
  }

  // Retrieve single Organisation model data for an Application
  readOrg_model(ApplicationId): Observable<Org_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Org_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getOrg_model.php`, { params: params} );
  }

  // Retrieve single Contact model data for an Application
  readCon_model(ApplicationId): Observable<Con_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Con_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getCon_model.php`, { params: params} );
  }

  // Retrieve single General Project model data for an Application
  readGen_model(ApplicationId): Observable<Gen_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Gen_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getGen_model.php`, { params: params} );
  }

  // Retrieve single Background model data for an Application
  readBac_model(ApplicationId): Observable<Bac_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Bac_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getBac_model.php`, { params: params} );
  }

  // Retrieve single Finance model data for an Application
  readFin_model(ApplicationId): Observable<Fin_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Fin_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getFin_model.php`, { params: params} );
  }
}
