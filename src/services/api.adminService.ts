import { Injectable, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User_model } from  '../models/User_class';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { matDialogComponent } from '../app/matDialog/matDialog.component';
import * as myGlobals from 'globals';
import * as bcrypt from 'bcryptjs';


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
        // Generate a hash password using 10 rounds of salt
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(User_model.password, salt);

        let params = new HttpParams()
                        .set('name', User_model.name)
                        .set('email', User_model.email)
                        .set('password', hash);
    
        return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/admin/register.php`, { params: params} );
    }

    //  Log the user in based on the email and password
    loginUser(User_model: User_model){
        let params = new HttpParams()
                        .set('email', User_model.email);

        try {
            this.httpClient.get<User_model>(`${myGlobals.PHP_API_SERVER}/api/admin/login.php`, { params: params} )
              .subscribe((Users) => {
                // Check the user actually logged in
                if (Users[0]) {
                    // Compare the returned password with the entered one
                    if (bcrypt.compareSync(User_model.password, Users[0].password)) {

                        let userToken = Users[0].id + '|' + Users[0].usertype + '|' + Users[0].email + '|' + Users[0].name;
                        this.setToken(userToken);
                        this.getLoggedInName.emit(true);
                        this.router.navigate(['/myaccount']);
                        return true;
                    } else {
                        this.showError('Incorrect password, please retry or register a new account.');
                        return true;
                    }
                } else {
                    this.showError('Unable to retrieve the account, please retry or register a new account.');
                    return true;
                }
            });
        } catch (e) {
            this.showError('Incorrect email, please retry or register a new account.');
            return true;
        }
    }


    showError(message:string){
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "600px";
                        
        dialogConfig.data = {
            title: 'Attention!', description: message, button1: 'OK', button2: '' 
          };
        this.dialog.open(matDialogComponent, dialogConfig);
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
  