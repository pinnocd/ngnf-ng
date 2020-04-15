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

  constructor( private adminService: ApiAdminService, public globals: Globals, private router: Router ) { 
    globals.loginbtn = true;
    adminService.getLoggedInName.subscribe(name => this.changeName(name));

    if(this.adminService.isLoggedIn())
    {
      globals.loginbtn=false;
      globals.logoutbtn=true

    }
    else{
      globals.loginbtn=true;
      globals.logoutbtn=false
    }
  }
  
  private changeName( name: boolean ): void {
      this.globals.logoutbtn = name;
      this.globals.loginbtn = !name;
      this.globals.adminuser =  this.adminService.isAdminUser();
    }

  logout()
  {
      this.adminService.deleteToken();
      this.globals.logoutbtn = false;
      this.globals.loginbtn = true;
      this.globals.adminuser = false;
      this.router.navigate(['']);
    }

  ngOnInit(): void {
  }
}

