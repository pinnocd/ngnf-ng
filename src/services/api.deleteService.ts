import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiDeleteService {
  PHP_API_SERVER = "http://ec2-35-177-242-73.eu-west-2.compute.amazonaws.com";
//    PHP_API_SERVER = "http://localhost:8080";

    constructor(private httpClient: HttpClient) { }

    deleteApplication(ApplicationId){
        let params = new HttpParams().set('ApplicationId', ApplicationId);
        return this.httpClient.get(`${this.PHP_API_SERVER}/api/delete/delApplication.php`, { params: params} )
    }
}

