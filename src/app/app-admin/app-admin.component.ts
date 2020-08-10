import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiUpdateService } from '../../services/api.updateService';
import { ApiAdminService } from '../../services/api.adminService';
import { matDialogComponent } from '../matDialog/matDialog.component';
import { AppAssignComponent } from '../app-assign/app-assign.component';

import { App_model } from  '../../models/App_model';
import { Org_model } from  '../../models/Org_model';
import { Con_model } from  '../../models/Con_model';
import { Gen_model } from  '../../models/Gen_model';
import { Bac_model } from  '../../models/Bac_model';
import { Fin_model } from  '../../models/Fin_model';

import { ApplData, AppActions } from '../../interfaces/globalinterfaces';

@Component({
  selector: 'app-app-admin',
  styleUrls: ['app-admin.component.css'],
  templateUrl: 'app-admin.component.html',
})

export class AppAdminComponent implements OnInit {
  displayedColumns: string[] = ['ApplicationId', 'User', 'OrgName', 'GenName', 'GenStartDate', 'Status', 
           'ProposalWriter', 'SeniorApprover', 'FundProvider', 'InsertDateTime', 'Action'];
  dataSource = new MatTableDataSource<ApplData>(ELEMENT_DATA);
 
  appActions: AppActions[];

  userName = '';
  userId = '';
  userType = '';
  pWriter = '';
  staffType = 'Senior Approver';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    let token = this.adminService.getToken();
    this.userId = token.split('|')[0];
    this.userType = token.split('|')[1];
    this.userName = token.split('|')[3];

    this.appActions = [{ActionCode: 'P', ActionDesc: 'Progress'}];

    // If the user is a proposal writer, limit their application list
    if (this.userType==="P") {
      this.pWriter = this.userId;
      this.staffType = 'Proposal Writer';
    }

    this.loadAppList();
    this.dataSource.paginator = this.paginator;
  }  

  App_models:  App_model[];
  Org_models:  Org_model[];
  Con_models:  Con_model[];
  Gen_models:  Gen_model[];
  Bac_models:  Bac_model[];
  Fin_models:  Fin_model[];

  selectedRowIndex: number = -1;

  constructor(private readService: ApiReadService, private adminService: ApiAdminService,
              private updateService: ApiUpdateService, public dialog: MatDialog) { }

  // Initial load of all applications
  loadAppList() {
    // update data in data source when available
    this.readService.readApplications("", this.pWriter, "Yes").subscribe(newData => this.dataSource.data = newData);

  }

  // An application has been selected in the list, so refresh all data
  selectApp(app_model){

    // Load the action drop down with the relevant options
    if (this.userType==="P") {
      // if we have an Assigned app, allow to Progress, otherwise nothing
      if (app_model.Status==="Assigned") {
        this.appActions = [{ActionCode: 'P', ActionDesc: 'Progress'}];
      }
      else {
        this.appActions = [];
      }
    }
    else {
      // Admin users have more options
      switch (app_model.Status) {
        case 'Submitted':
          this.appActions = [{ActionCode: 'A', ActionDesc: 'Assign'},
                            {ActionCode: 'R', ActionDesc: 'Reject'}];
          break;

        case 'Assigned':
          this.appActions = [ {ActionCode: 'P', ActionDesc: 'Progress'}];
          break;

        case 'In Progress':
          this.appActions = [ {ActionCode: 'F', ActionDesc: 'Fail'},
                            {ActionCode: 'C', ActionDesc: 'Succeed'}];
          break;

        default :
          this.appActions = [];
      }
    }

    //   // Remove all Admin specific actions (Reject, Assign, suCceed, Fail)
    //   this.statuses.splice(this.statuses.findIndex((s: StatusData) => s.StatusCode === 'R'), 1);

    this.readService.readOrg_model(app_model.ApplicationId).subscribe((Org_models: Org_model[])=>{
      this.Org_models = Org_models;
    })

    this.readService.readCon_model(app_model.ApplicationId).subscribe((Con_models: Con_model[])=>{
      this.Con_models = Con_models;
    })

    this.readService.readGen_model(app_model.ApplicationId).subscribe((Gen_models: Gen_model[])=>{
      this.Gen_models = Gen_models;
    })

    this.readService.readBac_model(app_model.ApplicationId).subscribe((Bac_models: Bac_model[])=>{
      this.Bac_models = Bac_models;
    })

    this.readService.readFin_model(app_model.ApplicationId).subscribe((Fin_models: Fin_model[])=>{
      this.Fin_models = Fin_models;
    })
  }


  confirmAction(element, action: string){
    const dialogConfig = new MatDialogConfig();
    var description: string;
    var title: string;
    var button1: string;
    var button2: string;
  
    if (action==="Assign"){
      description = 'Please select a Proposal Writer to assign the "' + element.OrgName + '" application for project "' + element.GenName + '"?';
      title = 'Please Select';
      button1 = 'Select';
      button2 = 'Cancel';
    }
    else {
      description = 'Are you absolutely sure you want to ' + action + ' the "' + element.OrgName + '" application for project "' + element.GenName + '"?';
      title= 'Please Confirm';
      button1 = 'Yes';
      button2 = 'No';
    }

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: title, 
      action: action,
      description: description,
      button1: button1,
      button2: button2
    };

    return this.dialog.open(matDialogComponent, dialogConfig);
  }

  selectAction(element, action) {
    var status: string;

    switch  (action.source.value) {
      case 'A':
        status = 'Assign'; break;
      case 'P': 
        status = 'Progress'; break;
      case 'C':
        status = 'Succeed'; break;
      case 'F':
        status = 'Fail'; break;
      case 'R':
        status = 'Reject'; break;
      default:
        console.log("No such action exists!");
    }

    if (action.source.value!='A'){
      let conf = this.confirmAction(element, status)

      conf.afterClosed().subscribe(
        data => { 
          if (data) {
            this.updateService.updateApplication(element.ApplicationId, action.source.value, data).subscribe(()=>{
              const dialogConfig = new MatDialogConfig();

              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.width = "600px";
              dialogConfig.data = {
                title: 'Confirmation',
                description: 'The status was successfully changed',
                button1: 'OK',
                button2: ''
              };
          
              this.dialog.open(matDialogComponent, dialogConfig);
              this.loadAppList();
            });
          } 
        }
      );
    }
    else {
      // We are assigning an app so pass control to the custom window for selection
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "600px";
      dialogConfig.data = {OrgName: element.OrgName, GenName: element.GenName, ApplicationId: element.ApplicationId};
  
      if (this.dialog.open(AppAssignComponent, dialogConfig)){
        this.loadAppList();
      }
    }
  }
}


var ELEMENT_DATA: ApplData[];
