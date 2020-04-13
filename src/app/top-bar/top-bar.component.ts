import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAdminService } from '../../services/api.adminService';
import { Globals } from 'globals';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [ Globals ]
})
export class TopBarComponent implements OnInit {

  constructor( private dataService: ApiAdminService, public globals: Globals, private router: Router ) { 
    globals.loginbtn = true;
    dataService.getLoggedInName.subscribe(name => this.changeName(name));

    if(this.dataService.isLoggedIn())
    {
      console.log("loggedin");
      globals.loginbtn=false;
      globals.logoutbtn=true
      globals.applybtn=false;
    }
    else{
      globals.loginbtn=true;
      globals.logoutbtn=false
      globals.applybtn=false;
    }
  }
  
  private changeName( name: boolean ): void {
    this.globals.logoutbtn = name;
    this.globals.loginbtn = !name;
    this.globals.applybtn = false;
  }
  logout()
  {
    this.dataService.deleteToken();
 //   window.location.href = window.location.href;
    this.router.navigate(['']);
  }
  ngOnInit(): void {
  }
}

