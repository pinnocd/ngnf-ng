import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from  'rxjs';

import { App_model } from  '../models/App_model';
import { Org_model } from  '../models/Org_model';
import { Con_model } from  '../models/Con_model';
import { Gen_model } from  '../models/Gen_model';
import { Bac_model } from  '../models/Bac_model';
import { Fin_model } from  '../models/Fin_model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://ec2-35-177-242-73.eu-west-2.compute.amazonaws.com";
//  PHP_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  // ************************  READ Functions  ************************ 
  // Retrieve All Applications
  readApplications(): Observable<App_model[]>{
    return this.httpClient.get<App_model[]>(`${this.PHP_API_SERVER}/api/get/getApplications.php`);
  }

  // Retrieve All Organisation model data
  readOrg_models(): Observable<Org_model[]>{
    return this.httpClient.get<Org_model[]>(`${this.PHP_API_SERVER}/api/get/getOrg_model.php`);
  }

  // Retrieve single Organisation model data for an Application
  readOrg_model(ApplicationId): Observable<Org_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Org_model[]>(`${this.PHP_API_SERVER}/api/get/getOrg_model.php`, { params: params} );
  }

  // Retrieve single Contact model data for an Application
  readCon_model(ApplicationId): Observable<Con_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Con_model[]>(`${this.PHP_API_SERVER}/api/get/getCon_model.php`, { params: params} );
  }

  // Retrieve single General Project model data for an Application
  readGen_model(ApplicationId): Observable<Gen_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Gen_model[]>(`${this.PHP_API_SERVER}/api/get/getGen_model.php`, { params: params} );
  }

  // Retrieve single Background model data for an Application
  readBac_model(ApplicationId): Observable<Bac_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Bac_model[]>(`${this.PHP_API_SERVER}/api/get/getBac_model.php`, { params: params} );
  }

  // Retrieve single Finance model data for an Application
  readFin_model(ApplicationId): Observable<Fin_model[]>{
    let params = new HttpParams().set('ApplicationId', ApplicationId);
    return this.httpClient.get<Fin_model[]>(`${this.PHP_API_SERVER}/api/get/getFin_model.php`, { params: params} );
  }


  // ************************  CREATE Functions  ************************ 
  createOrg(Org_model: Org_model): Observable<Org_model>{
    return this.httpClient.post<Org_model>(`${this.PHP_API_SERVER}api/post/addOrg_model.php`, Org_model);
  }

  updateOrg_model(Org_model: Org_model){
    return this.httpClient.put<Org_model>(`${this.PHP_API_SERVER}/api/update.php`, Org_model);   
  }

  deleteOrg_model(id: number){
    return this.httpClient.delete<Org_model>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }
}
