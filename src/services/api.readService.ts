import { Injectable, Version } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from  'rxjs';
import * as myGlobals from 'globals';

import { App_model } from  '../models/App_model';
import { Org_model } from  '../models/Org_model';
import { Con_model } from  '../models/Con_model';
import { Gen_model } from  '../models/Gen_model';
import { Bac_model } from  '../models/Bac_model';
import { Fin_model } from  '../models/Fin_model';
import { User_model } from '../models/User_class';
import { FundProviders_model } from '../models/FundProviders_model';
import { Statuses_model } from '../models/Statuses_model';
import { Categories_model } from '../models/Categories_model';
import { OrgTypes_model} from '../models/OrgTypes_model';


@Injectable({
  providedIn: 'root'
})

export class ApiReadService {
  constructor(private httpClient: HttpClient) { }

  // ************************  START READ Functions  ************************ 
  // Retrieve All Applications for the specific user and/or proposal writer
  readApplications(UserId, PWriter, Original): Observable<App_model[]>{
    let params = new HttpParams().set('UserId', UserId)
                                 .set('PWriter', PWriter)
                                 .set('Original', Original);
                                 
    return this.httpClient.get<App_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getApplications.php`, { params: params} );
  }

  // Retrieve All Applications
  readAllApps(): Observable<App_model[]>{
    return this.httpClient.get<App_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getApplications.php`);
  }

  // Retrieve All users
  readAllUsers(PWriter): Observable<User_model[]>{
    let params = new HttpParams().set('PWriter', PWriter);
    return this.httpClient.get<User_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getUsers.php`, { params: params} );
  }

  // Retrieve all Funding Providers
  readAllFundProviders(): Observable<FundProviders_model[]>{
    return this.httpClient.get<FundProviders_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getFundProviders.php` );
  }

  // Retrieve all Statuses
  readStatuses(): Observable<Statuses_model[]>{
    return this.httpClient.get<Statuses_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getStatuses.php` );
  }

  // Retrieve all Statuses
  readCategories(): Observable<Categories_model[]>{
    return this.httpClient.get<Categories_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getCategories.php` );
  }

  // Retrieve all Org Types
  readOrgTypes(): Observable<OrgTypes_model[]>{
    return this.httpClient.get<OrgTypes_model[]>(`${myGlobals.PHP_API_SERVER}/api/get/getOrgTypes.php` );
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
