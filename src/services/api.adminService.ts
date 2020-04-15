import { Injectable, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User_model } from  '../models/User_class';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { matDialogComponent } from '../app/matDialog/matDialog.component';
import * as myGlobals from 'globals';

@Injectable({
  providedIn: 'root'
})

export class ApiAdminService {

    constructor(private httpClient : HttpClient, private router: Router, public dialog: MatDialog) { }

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    redirectUrl: string;
    baseUrl:string = myGlobals.PHP_API_SERVER;

    //  Register a new user based on the entered form data
    registerUser(User_model: User_model){
        let params = new HttpParams()
        .set('name', User_model.name)
        .set('email', User_model.email)
        .set('pwd', User_model.password);

        return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/admin/register.php`, { params: params} );
    }

    //  Log the user in based on the email and password
    loginUser(User_model: User_model){
        let params = new HttpParams()
        .set('email', User_model.email)
        .set('pwd', User_model.password);

        this.httpClient.get<User_model>(`${myGlobals.PHP_API_SERVER}/api/admin/login.php`, { params: params} )
            .subscribe((Users) => {
                // Check the user actually logged in
                if (Users[0]) {
                    let userToken = Users[0].id + '|' + Users[0].usertype + '|' + Users[0].email + '|' + Users[0].name;
                    this.setToken(userToken);
                    this.getLoggedInName.emit(true);
                    this.router.navigate(['/myaccount']);

                    return true;    
                } else {
                    const dialogConfig = new MatDialogConfig();

                    dialogConfig.disableClose = true;
                    dialogConfig.autoFocus = true;
                    dialogConfig.width = "600px";
                                    
                    dialogConfig.data = {
                        title: 'Attention!', description: 'The credentials provided are incorrect.  Please retry or register a new account.'
                        , button1: 'OK', button2: '' 
                      };
                      this.dialog.open(matDialogComponent, dialogConfig);
    
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
    
    isAdminUser() {
        const usertoken = this.getToken();

        // Example token = 2|A|dean_pinnock@yahoo.com|Dean Pinnock
        return usertoken.split('|')[1]==="A";
    }
}
  