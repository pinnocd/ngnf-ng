import { Component } from '@angular/core';
import { ApiAdminService } from '../../services/api.adminService';
import { User_class } from '../../models/User_class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  })

  export class LoginComponent {

    User_Model = new User_class();

    constructor( private adminService: ApiAdminService ) {}

    LoginUser(){
      try{
          this.adminService.loginUser(this.User_Model)
        } catch (e) {
          alert("There was a problem logging in, please contact admin@ngnf.co.uk");
        }
    }
  }
