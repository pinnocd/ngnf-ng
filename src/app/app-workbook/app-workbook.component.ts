import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiUpdateService } from '../../services/api.updateService';
import { ApiAdminService } from '../../services/api.adminService';
import { matDialogComponent } from '../matDialog/matDialog.component';

import { App_model } from  '../../models/App_model';
import { Org_model } from  '../../models/Org_model';
import { Org_class } from  '../../models/Org_class';
import { Con_model } from  '../../models/Con_model';
import { Con_class } from  '../../models/Con_class';
import { Gen_model } from  '../../models/Gen_model';
import { Gen_class } from  '../../models/Gen_class';
import { Bac_model } from  '../../models/Bac_model';
import { Bac_class } from  '../../models/Bac_class';
import { Fin_model } from  '../../models/Fin_model';
import { Fin_class } from  '../../models/Fin_class';

import { ApplData } from '../../interfaces/globalinterfaces';

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-app-workbook',
  templateUrl: './app-workbook.component.html',
  styleUrls: ['./app-workbook.component.css']
})
export class AppWorkbookComponent implements OnInit {
  displayedColumns: string[] = ['ApplicationId', 'OrigApplicationId', 'FundProvider', 'OrgName', 'SeniorApprover', 'Status', 'InsertDateTime'];
  dataSource = new MatTableDataSource<ApplData>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.loadAppList();
    this.dataSource.paginator = this.paginator;
  }  

  App_model:  App_model[];
  Org_Model:  Org_model[];
  Org_model = new Org_class();
  Con_Model:  Con_model[];
  Con_model = new Con_class();
  Gen_Model:  Gen_model[];
  Gen_model = new Gen_class();
  Bac_Model:  Bac_model[];
  Bac_model = new Bac_class();  
  Fin_Model:  Fin_model[];
  Fin_model = new Fin_class();

  selectedRowIndex: number = -1;
  selectedIndex = 0;
  username = '';
  ApplicationId = 0;
  AppStatus:string = "";
  pWriter = "";

  constructor(private readService: ApiReadService,  private adminService: ApiAdminService, 
              private updateService: ApiUpdateService, public dialog: MatDialog) { }

  // Initial load of all applications
  loadAppList() {
    this.ApplicationId = 0;
    this.AppStatus = "";

    // update data in data source when available
    let token = this.adminService.getToken();

    // Example token = 2|A|dean_pinnock@yahoo.com|Dean Pinnock
    this.username = token.split('|')[3];

    let userId = token.split('|')[0];
    let userType = token.split('|')[1];

    switch (userType) {
      case 'A':
        // Admin users see everything so blank the id.
        userId = ""; 
        break;
      case 'P': 
        // Proposal Writer so set the value
        this.pWriter = userId;
        userId = ""; 
        break;
    }

    this.readService.readApplications(userId, this.pWriter, 'Yes')
      .subscribe(newData => this.dataSource.data = newData)
      ;
  }

  // An application has been selected in the list, so refresh all data
  selectApp(app_model){
    this.ApplicationId = app_model.ApplicationId;
    this.AppStatus = app_model.Status;

    this.readService.readOrg_model(app_model.ApplicationId).subscribe((Org_model: Org_model[])=>{
      this.Org_Model = Org_model;

      this.Org_model.OrgName = this.Org_Model[0].OrgName;
      this.Org_model.OrgAddress = this.Org_Model[0].OrgAddress;
      this.Org_model.OrgPostcode = this.Org_Model[0].OrgPostcode;
      this.Org_model.OrgEmail = this.Org_Model[0].OrgEmail;
      this.Org_model.OrgWebsite = this.Org_Model[0].OrgWebsite;
      this.Org_model.OrgType = this.Org_Model[0].OrgType;
      this.Org_model.OrgCharity = this.Org_Model[0].OrgCharity;
      this.Org_model.OrgCharityNo = this.Org_Model[0].OrgCharityNo;
      this.Org_model.OrgCompanyNo = this.Org_Model[0].OrgCompanyNo;
      this.Org_model.OrgStartDate = this.Org_Model[0].OrgStartDate;
      this.Org_model.OrgOpen = this.Org_Model[0].OrgOpen;
      this.Org_model.OrgInfo = this.Org_Model[0].OrgInfo;
    })

    this.readService.readCon_model(app_model.ApplicationId).subscribe((Con_model: Con_model[])=>{
      this.Con_Model = Con_model;

      this.Con_model.ConName = this.Con_Model[0].ConName;
      this.Con_model.ConPosition = this.Con_Model[0].ConPosition;
      this.Con_model.ConDOB = this.Con_Model[0].ConDOB;
      this.Con_model.ConAddress = this.Con_Model[0].ConAddress;
      this.Con_model.ConPreAddress = this.Con_Model[0].ConPreAddress;
      this.Con_model.ConLandlineNo = this.Con_Model[0].ConLandlineNo;
      this.Con_model.ConOtherNo = this.Con_Model[0].ConOtherNo;
      this.Con_model.ConEmail = this.Con_Model[0].ConEmail;
      this.Con_model.ConSenName = this.Con_Model[0].ConSenName;
      this.Con_model.ConSenPosition = this.Con_Model[0].ConSenPosition;
      this.Con_model.ConSenDOB = this.Con_Model[0].ConSenDOB;
      this.Con_model.ConSenAddress = this.Con_Model[0].ConSenAddress;
      this.Con_model.ConSenPreAddress = this.Con_Model[0].ConSenPreAddress;
      this.Con_model.ConSenLandlineNo = this.Con_Model[0].ConSenLandlineNo;
      this.Con_model.ConSenOtherNo = this.Con_Model[0].ConSenOtherNo;
      this.Con_model.ConSenEmail = this.Con_Model[0].ConSenEmail;
    })

    this.readService.readGen_model(app_model.ApplicationId).subscribe((Gen_model: Gen_model[])=>{
      this.Gen_Model = Gen_model;

      this.Gen_model.GenName = this.Gen_Model[0].GenName;
      this.Gen_model.GenStartDate = this.Gen_Model[0].GenStartDate;
      this.Gen_model.GenAchieve = this.Gen_Model[0].GenAchieve;
      this.Gen_model.GenProblem = this.Gen_Model[0].GenProblem;
      this.Gen_model.GenVulnerables = this.Gen_Model[0].GenVulnerables;
      this.Gen_model.GenSafeguards = this.Gen_Model[0].GenSafeguards;
      this.Gen_model.GenNotes = this.Gen_Model[0].GenNotes;
    })

    this.readService.readBac_model(app_model.ApplicationId).subscribe((Bac_model: Bac_model[])=>{
      this.Bac_Model = Bac_model;

      this.Bac_model.BacNeed = this.Bac_Model[0].BacNeed;
      this.Bac_model.BacTarget = this.Bac_Model[0].BacTarget;
      this.Bac_model.BacActivities = this.Bac_Model[0].BacActivities;
      this.Bac_model.BacDeliver = this.Bac_Model[0].BacDeliver;
      this.Bac_model.BacUsers = this.Bac_Model[0].BacUsers;
    })

    this.readService.readFin_model(app_model.ApplicationId).subscribe((Fin_model: Fin_model[])=>{
      this.Fin_Model = Fin_model;

      this.Fin_model.FinActivity = this.Fin_Model[0].FinActivity;
      this.Fin_model.FinCost = this.Fin_Model[0].FinCost;
      this.Fin_model.FinCapital = this.Fin_Model[0].FinCapital;
      this.Fin_model.FinRevenue = this.Fin_Model[0].FinRevenue;
      this.Fin_model.FinAuditedAccounts = this.Fin_Model[0].FinAuditedAccounts;

      console.log(this.Fin_model);
    })
  }

  saveData() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm', description: 'Are you sure you are happy to save this application data?', button1: 'Yes Please', button2: 'No Thanks' 
    };
  
    const diaret = this.dialog.open(matDialogComponent, dialogConfig);

    diaret.afterClosed().subscribe(
      data => { 
        if (data) {
            try{

              this.Org_model.ApplicationId = this.ApplicationId;
              this.Con_model.ApplicationId = this.ApplicationId;
              this.Gen_model.ApplicationId = this.ApplicationId;
              this.Bac_model.ApplicationId = this.ApplicationId;
              this.Fin_model.ApplicationId = this.ApplicationId;

              // Further tweeks
              if (!this.Fin_model.FinCost){this.Fin_model.FinCost = 0;}

              this.updateService.updateOrg_model(this.Org_model).subscribe(()=>{});
              this.updateService.updateCon_model(this.Con_model).subscribe(()=>{});
              this.updateService.updateGen_model(this.Gen_model).subscribe(()=>{});
              this.updateService.updateBac_model(this.Bac_model).subscribe(()=>{});
              this.updateService.updateFin_model(this.Fin_model).subscribe(()=>{});

              dialogConfig.data = {
                title: 'Confirmation', description: 'Your Application data was successfully updated.'
                , button1: 'OK', button2: '' 
              };
              this.dialog.open(matDialogComponent, dialogConfig);
              this.selectedIndex = 0;
              this.loadAppList();
            } catch (e) {
              console.log(e);
              alert("There was a problem updating your data, please contact admin@ngnf.co.uk");
            }
        }
      }
    )
  }
}

var ELEMENT_DATA: ApplData[];
