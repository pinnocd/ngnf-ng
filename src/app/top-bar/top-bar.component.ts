import { Component, OnInit } from '@angular/core';
import { ApiAdminService } from '../../services/api.adminService';
import { Globals } from 'globals';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [ Globals ]
})
export class TopBarComponent implements OnInit {

  constructor( private dataService: ApiAdminService, public globals: Globals ) { 
    globals.loginbtn = true;
    dataService.getLoggedInName.subscribe(name => this.changeName(name));

    if(this.dataService.isLoggedIn())
    {
      console.log("loggedin");
      globals.loginbtn=false;
      globals.logoutbtn=true
      globals.applybtn=true;
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
    this.globals.applybtn = this.globals.logoutbtn;
  }
  logout()
  {
    this.dataService.deleteToken();
    window.location.href = window.location.href;
  }
  ngOnInit(): void {
  }
}

