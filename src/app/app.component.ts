import { Component } from '@angular/core';
import { ApiAdminService } from '../services/api.adminService';
import * as myGlobals from 'globals';
import { Globals } from 'globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ Globals ]
})
export class AppComponent {
  title = 'ngnf';
  
//  loginbtn:boolean;
//  logoutbtn:boolean;
  
  constructor(private dataService: ApiAdminService, public globals: Globals ) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));

    if(this.dataService.isLoggedIn())
    {
      console.log("loggedin");
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
  }
  logout()
  {
    this.dataService.deleteToken();
    window.location.href = window.location.href;
  }
}
