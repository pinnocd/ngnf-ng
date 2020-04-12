import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiAdminService } from '../../services/api.adminService';
import { User_class } from '../../models/User_class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  })

export class LoginComponent implements OnInit {

  User_Model = new User_class();

  constructor( private adminService: ApiAdminService,private router:Router ) {
    }

  ngOnInit() {
  }



  LoginUser(){
    console.log(this.User_Model);

    
    // try{
    //   this.adminService.loginUser(this.User_Model).subscribe(ApplicationId => {

    //   })
    // } catch (e) {
    // alert("There was a problem logging in, please contact admin@ngnf.co.uk");

    try{
      this.adminService.loginUser(this.User_Model)
    } catch (e) {
    alert("There was a problem logging in, please contact admin@ngnf.co.uk");


  }

  // postdata(angForm1)
  // {
  //   this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
  //   .pipe(first())
  //   .subscribe(
  //   data => {
  //     const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
  //     this.router.navigate([redirect]);
  //     },
  //     error => {
  //       alert("User name or password is incorrect")
  //     });
  //   }
  //   get email() { return this.angForm.get('email'); }
  //   get password() { return this.angForm.get('password'); 
   }
}
