import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiAdminService } from '../../services/api.adminService';
import { User_class } from '../../models/User_class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  })

export class RegisterComponent implements OnInit {
    User_Model = new User_class();

    constructor( private adminService: ApiAdminService, private router:Router ) {
    }

    ngOnInit() {
    }


    RegisterUser(){
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
