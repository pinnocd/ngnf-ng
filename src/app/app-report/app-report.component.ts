import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiDeleteService } from '../../services/api.deleteService';
import { ApiUpdateService } from '../../services/api.updateService';
import { ApiAdminService } from '../../services/api.adminService';
import { matDialogComponent } from '../matDialog/matDialog.component';

import { App_model } from  '../../models/App_model';
import { Org_model } from  '../../models/Org_model';
import { Con_model } from  '../../models/Con_model';
import { Gen_model } from  '../../models/Gen_model';
import { Bac_model } from  '../../models/Bac_model';
import { Fin_model } from  '../../models/Fin_model';

import { ApplData } from '../../interfaces/globalinterfaces';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
  selector: 'app-app-report',
  styleUrls: ['app-report.component.css'],
  templateUrl: 'app-report.component.html',
})

export class AppReportComponent implements OnInit {
  displayedColumns: string[] = ['ApplicationId', 'User', 'OrgName', 'GenName', 'GenStartDate', 'Status', 'InsertDateTime', 
                                'Accept', 'Reject', 'Progress', 'Succeed', 'Fail'];
  dataSource = new MatTableDataSource<ApplData>(ELEMENT_DATA);
  username = '';
  userid = '';
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
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

  constructor(private readService: ApiReadService, private deleteService: ApiDeleteService, private adminService: ApiAdminService,
              private updateService: ApiUpdateService, public dialog: MatDialog) { }

  // Initial load of all applications
  loadAppList() {
    // update data in data source when available
    this.readService.readAllApps().subscribe(newData => this.dataSource.data = newData);

    let token = this.adminService.getToken();
    this.username = token.split('|')[3];
    this.userid = token.split('|')[0];

    console.log(this.userid);
  }

  // An application has been selected in the list, so refresh all data
  selectApp(app_model){
    console.log(app_model);

    this.readService.readOrg_model(app_model.ApplicationId).subscribe((Org_models: Org_model[])=>{
      this.Org_models = Org_models;
      console.log(this.Org_models);
    })

    this.readService.readCon_model(app_model.ApplicationId).subscribe((Con_models: Con_model[])=>{
      this.Con_models = Con_models;
      console.log(this.Con_models);
    })

    this.readService.readGen_model(app_model.ApplicationId).subscribe((Gen_models: Gen_model[])=>{
      this.Gen_models = Gen_models;
      console.log(this.Gen_models);
    })

    this.readService.readBac_model(app_model.ApplicationId).subscribe((Bac_models: Bac_model[])=>{
      this.Bac_models = Bac_models;
      console.log(this.Bac_models);
    })

    this.readService.readFin_model(app_model.ApplicationId).subscribe((Fin_models: Fin_model[])=>{
      this.Fin_models = Fin_models;
      console.log(this.Fin_models);
    })
  }


  confirmAction(element, action: string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm',
      description: 'Are you absolutely sure you want to ' + action + ' the "' + element.OrgName + '" application for project "' + element.GenName + '"?',
      button1: 'Yes',
      button2: 'No'
    };

    return this.dialog.open(matDialogComponent, dialogConfig);
  }


  deleteApp(element) {
    let conf = this.confirmAction(element, 'Delete')

    conf.afterClosed().subscribe(
      data => { 
        if (data) {
          this.deleteService.deleteApplication(element.ApplicationId).subscribe(()=>{});
          this.loadAppList();
          this.Org_models.length = 0;
          this.Con_models.length = 0;
          this.Gen_models.length = 0;
          this.Bac_models.length = 0;
          this.Fin_models.length = 0;        
        } 
      }
    );
  }
  
  updateApp(element, action: string) {
    let conf = this.confirmAction(element, action)
    var status: string;

    switch  (action) {
      case 'Accept': status = "A"; break;
      case 'Progress': status = "I"; break;
      case 'Succeed': status = "C"; break;
      case 'Fail': status = "F"; break;
      case 'Reject': status = "R"; break;
      default:
              console.log("No such action exists!");
              break;
    }

  console.log(status);
      conf.afterClosed().subscribe(
        data => { 
          if (data) {
            this.updateService.updateApplication(element.ApplicationId, status, this.userid).subscribe(()=>{});
            this.loadAppList();
          } 
        }
      );
    }

    // 'S', 'Submitted'
      // 'A', 'Accepted'
        // 'I', 'Progress'
          // 'C', 'Successful'
          // 'F', 'Failed'
      // 'R', 'Rejected'
}

var ELEMENT_DATA: ApplData[];
