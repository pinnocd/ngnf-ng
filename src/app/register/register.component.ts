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
        console.log("register the user");
        console.log(this.User_Model);

        try {
              this.adminService.registerUser(this.User_Model).subscribe(
                  data => {
                    console.log("Account successfully created so force a login");
                    this.router.navigate(['login']);
                  }
                )
        } catch (e) {
        alert("There was a problem saving your data, please contact admin@ngnf.co.uk");
        }      
    }
}
        
        // try{
        //   this.adminService.registerUser(this.User_Model).subscribe(dave => {
        //       console.log(dave);
        //   })
  

    // postdata(angForm1)
    // {
    //   RegisterUser9(){
    //     console.log("register the user part 2");
    //    this.adminService.userregistration(this.User_Model.name, this.User_Model.email, this.User_Model.password)
    //      .pipe(first())
    //      .subscribe(
    //      data => {
    //        this.router.navigate(['login']);
    // },
    // error => {
    //   });
    // }

  //   get email() { return this.angForm.get('email'); }
  //   get password() { return this.angForm.get('password'); }
  //  get name() { return this.angForm.get('name'); }
//}
