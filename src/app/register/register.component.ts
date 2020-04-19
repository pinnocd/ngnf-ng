import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAdminService } from '../../services/api.adminService';
import { User_class } from '../../models/User_class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  })

export class RegisterComponent {
    User_Model = new User_class();

    constructor( private adminService: ApiAdminService, private router:Router ) {
    }

    registerUser(){
        try {
            this.adminService.registerUser(this.User_Model).subscribe(
              () => {
                console.log("Account successfully created so force a login");
                this.router.navigate(['login']);
              }
            )
        } catch (e) {
            alert("There was a problem saving your data, please contact admin@ngnf.co.uk");
        }      
    }
}
