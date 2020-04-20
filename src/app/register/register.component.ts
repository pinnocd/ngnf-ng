import { Component } from '@angular/core';
import { ApiAdminService } from '../../services/api.adminService';
import { User_class } from '../../models/User_class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  })

export class RegisterComponent {
    User_Model = new User_class();

    constructor( private adminService: ApiAdminService ) {
    }

    registerUser(){
        try {
            this.adminService.registerUser(this.User_Model)
        } catch (e) {
          alert("There was a problem saving your data, please contact admin@ngnf.co.uk");
        }      
    }
}
