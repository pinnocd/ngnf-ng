import { Injectable, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User_model } from  '../models/User_class';
import * as myGlobals from 'globals';

@Injectable({
  providedIn: 'root'
})

export class ApiAdminService {

    constructor(private httpClient : HttpClient, private router: Router) { }

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();


    redirectUrl: string;
    baseUrl:string = myGlobals.PHP_API_SERVER;

    //  Register a new user based on the entered form data
    registerUser(User_model: User_model){
        let params = new HttpParams()
        .set('name', User_model.name)
        .set('email', User_model.email)
        .set('pwd', User_model.password);

        console.log(params);

        return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/admin/register.php`, { params: params} );
    }

    //  Log the user in based on the email and password
    loginUser(User_model: User_model){
        let params = new HttpParams()
        .set('email', User_model.email)
        .set('pwd', User_model.password);

        console.log(params);

        this.httpClient.get<User_model>(`${myGlobals.PHP_API_SERVER}/api/admin/login.php`, { params: params} )
            .subscribe((Users) => {
                // Check the user actually logged in
                if (Users[0]) {
                    console.log(Users[0].id);
                    this.setToken(Users[0].id);
                    this.getLoggedInName.emit(true);
                    this.router.navigate(['/myaccount']);

                    return true;    
                } else {
                    alert("Calling the Fraud Squad");
                }
            });
    }


    //token
    setToken(token: string) {
        localStorage.setItem('token', token);
        }

    getToken() {
        return localStorage.getItem('token');
        }

    deleteToken() {
        localStorage.removeItem('token');
        }

    isLoggedIn() {
        const usertoken = this.getToken();
        if (usertoken != null) {
            return true
        }
            return false;
        }
}
  