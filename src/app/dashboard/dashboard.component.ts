import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiDeleteService } from '../../services/api.deleteService';
import { ApiCreateService } from '../../services/api.createService';
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
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['ApplicationId', 'User', 'OrgName', 'GenName', 'GenStartDate', 'Status', 'InsertDateTime', 'Delete'];
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

  selectedIndex = 0;
  username = '';

  constructor(private apiService: ApiReadService, private apiDelService: ApiDeleteService,
              private adminService: ApiAdminService, private createService: ApiCreateService,
              public dialog: MatDialog) { }

  // Initial load of all applications
  loadAppList() {
    // update data in data source when available
    let token = this.adminService.getToken();

    // Example token = 2|A|dean_pinnock@yahoo.com|Dean Pinnock
    this.username = token.split('|')[3];

    let userId = token.split('|')[0];
    let userType = token.split('|')[1];

    // Admin users see everything so blank the id.
    if (userType === "A")
      {userId = "";}

    this.apiService.readApplications(userId)
      .subscribe(newData => this.dataSource.data = newData)
      ;
  }

  // An application has been selected in the list, so refresh all data
  selectApp(app_model){
    console.log(app_model);

    this.apiService.readOrg_model(app_model.ApplicationId).subscribe((Org_model: Org_model[])=>{
      this.Org_Model = Org_model;

      this.Org_model.OrgName = this.Org_Model[0].OrgName;
      this.Org_model.OrgAddress = this.Org_Model[0].OrgAddress;
      this.Org_model.OrgPostcode = this.Org_Model[0].OrgPostcode;
      this.Org_model.OrgEmail = this.Org_Model[0].OrgEmail;
      this.Org_model.OrgWebsite = this.Org_Model[0].OrgWebsite;
      this.Org_model.OrgType = this.Org_Model[0].OrgType;
      this.Org_model.OrgCharity = this.Org_Model[0].OrgCharity;
      this.Org_model.OrgCharityNo = this.Org_Model[0].OrgCharityNo;
      this.Org_model.OrgStartDate = this.Org_Model[0].OrgStartDate;
      this.Org_model.OrgOpen = this.Org_Model[0].OrgOpen;
      this.Org_model.OrgInfo = this.Org_Model[0].OrgInfo;

      console.log(this.Org_Model);
    })

    this.apiService.readCon_model(app_model.ApplicationId).subscribe((Con_model: Con_model[])=>{
      this.Con_Model = Con_model;

      this.Con_model.ConName = this.Con_Model[0].ConName;
      this.Con_model.ConDOB = this.Con_Model[0].ConDOB;
      this.Con_model.ConAddress = this.Con_Model[0].ConAddress;
      this.Con_model.ConPreAddress = this.Con_Model[0].ConPreAddress;
      this.Con_model.ConLandlineNo = this.Con_Model[0].ConLandlineNo;
      this.Con_model.ConOtherNo = this.Con_Model[0].ConOtherNo;
      this.Con_model.ConEmail = this.Con_Model[0].ConEmail;
      this.Con_model.ConSenName = this.Con_Model[0].ConSenName;
      this.Con_model.ConSenDOB = this.Con_Model[0].ConSenDOB;
      this.Con_model.ConSenAddress = this.Con_Model[0].ConSenAddress;
      this.Con_model.ConSenPreAddress = this.Con_Model[0].ConSenPreAddress;
      this.Con_model.ConSenLandlineNo = this.Con_Model[0].ConSenLandlineNo;
      this.Con_model.ConSenOtherNo = this.Con_Model[0].ConSenOtherNo;
      this.Con_model.ConSenEmail = this.Con_Model[0].ConSenEmail;

      console.log(this.Con_model);
    })

    this.apiService.readGen_model(app_model.ApplicationId).subscribe((Gen_model: Gen_model[])=>{
      this.Gen_Model = Gen_model;

      this.Gen_model.GenName = this.Gen_Model[0].GenName;
      this.Gen_model.GenStartDate = this.Gen_Model[0].GenStartDate;
      this.Gen_model.GenAchieve = this.Gen_Model[0].GenAchieve;
      this.Gen_model.GenProblem = this.Gen_Model[0].GenProblem;
      this.Gen_model.GenVulnerables = this.Gen_Model[0].GenVulnerables;
      this.Gen_model.GenSafeguards = this.Gen_Model[0].GenSafeguards;
      
      console.log(this.Gen_model);
    })

    this.apiService.readBac_model(app_model.ApplicationId).subscribe((Bac_model: Bac_model[])=>{
      this.Bac_Model = Bac_model;

      this.Bac_model.BacNeed = this.Bac_Model[0].BacNeed;
      this.Bac_model.BacTarget = this.Bac_Model[0].BacTarget;
      this.Bac_model.BacActivities = this.Bac_Model[0].BacActivities;
      this.Bac_model.BacDeliver = this.Bac_Model[0].BacDeliver;
      this.Bac_model.BacUsers = this.Bac_Model[0].BacUsers;

      console.log(this.Bac_model);
    })

    this.apiService.readFin_model(app_model.ApplicationId).subscribe((Fin_model: Fin_model[])=>{
      this.Fin_Model = Fin_model;

      this.Fin_model.FinActivity = this.Fin_Model[0].FinActivity;
      this.Fin_model.FinCost = this.Fin_Model[0].FinCost;

      console.log(this.Fin_model);
    })
  }

  deleteApp(element): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm',
      description: 'Are you absolutely sure you want to delete the ' + element.OrgName + ' application for project "' + element.GenName + '"?',
      button1: 'Yes',
      button2: 'No'
    };

    const diaret = this.dialog.open(matDialogComponent, dialogConfig);

    diaret.afterClosed().subscribe(
      data => { 
        if (data) {
          this.apiDelService.deleteApplication(element.ApplicationId).subscribe(()=>{});
          this.loadAppList();
          this.Org_Model.length = 0;
          this.Con_Model.length = 0;
          this.Gen_Model.length = 0;
          this.Bac_Model.length = 0;
          this.Fin_Model.length = 0;        
        } 
      }
    );
  }  

  newApp(){
    this.Org_model = new Org_class();
    this.Con_model = new Con_class();
    this.Gen_model = new Gen_class();
    this.Bac_model = new Bac_class();  
    this.Fin_model = new Fin_class();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm', description: 'Would you like to have a sample application loaded?', button1: 'Yes Please', button2: 'No Thanks'
    };

    const diaret = this.dialog.open(matDialogComponent, dialogConfig);

    diaret.afterClosed().subscribe(
      data => { 
        if (data) {
          // Set up default sample data
          this.Org_model.OrgName = "Sample Organisation Name";
          this.Org_model.OrgAddress = "43 Unknown St, Huddersfield";
          this.Org_model.OrgPostcode = "HD1 1LS";
          this.Org_model.OrgEmail = "sampleemail@gmail.com";
          this.Org_model.OrgWebsite = "http://website.co.uk/";
          this.Org_model.OrgType = "S";
          this.Org_model.OrgCharity = true;
          this.Org_model.OrgCharityNo = 1129873;
          this.Org_model.OrgStartDate = new Date("");
          this.Org_model.OrgOpen = true;
          this.Org_model.OrgInfo = "n/a";
      
          this.Con_model.ConName = "Arthur Daley";
          this.Con_model.ConDOB = new Date("");
          this.Con_model.ConAddress = "12 Fulham Street, London, NW8 2QS";
          this.Con_model.ConPreAddress = "";
          this.Con_model.ConLandlineNo = "";
          this.Con_model.ConOtherNo = "07710 000000";
          this.Con_model.ConEmail = "contact@hotmail.com";
          this.Con_model.ConSenName = "Senior Contact";
          this.Con_model.ConSenDOB = new Date("");
          this.Con_model.ConSenAddress = "62 Letsby Road, Sheffield, SH8 1AR";
          this.Con_model.ConSenPreAddress = "";
          this.Con_model.ConSenLandlineNo = "";
          this.Con_model.ConSenOtherNo = "07715 987 543";
          this.Con_model.ConSenEmail = "seniorcont@hotmail.co.uk";

          this.Gen_model.GenName = "Huddersfield School";
          this.Gen_model.GenStartDate = new Date("");
          this.Gen_model.GenAchieve = "Provide entertainment for the huddersfield community.";
          this.Gen_model.GenProblem = "This project will provide activities for children and young people.";
          this.Gen_model.GenVulnerables = true;
          this.Gen_model.GenSafeguards = false;

          this.Bac_model.BacNeed = "The need, vision and direction of the projects is to engage residents and visitors.";
          this.Bac_model.BacTarget = "Our overall focus is to enhance participation in community eventy.";
          this.Bac_model.BacActivities = "Weekly residential home visits for children";
          this.Bac_model.BacDeliver = "Deliver Mansfield positive results.";
          this.Bac_model.BacUsers = "Mainly volunteers but some professionals due to safeguards.";

          this.Fin_model.FinActivity = "Funding for the whole thing.";
          this.Fin_model.FinCost = 100.50;
        } 
      }
    );
  }


  Submit_Data() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm', description: 'Are you sure you are happy to submit this application?', button1: 'Yes Please', button2: 'No Thanks' 
    };
  
    const diaret = this.dialog.open(matDialogComponent, dialogConfig);

    diaret.afterClosed().subscribe(
      data => { 
        if (data) {

          try{
              this.createService.createApp().subscribe(ApplicationId => {
                  var AppId: number;
                  AppId = ApplicationId as number;

                  console.log("The ApplicationId is " + AppId.toString());

                  this.Org_model.ApplicationId = AppId;
                  this.Con_model.ApplicationId = AppId;
                  this.Gen_model.ApplicationId = AppId;
                  this.Bac_model.ApplicationId = AppId;
                  this.Fin_model.ApplicationId = AppId;

                  this.createService.createOrg_model(this.Org_model).subscribe(()=>{});
                  this.createService.createCon_model(this.Con_model).subscribe(()=>{});
                  this.createService.createGen_model(this.Gen_model).subscribe(()=>{});
                  this.createService.createBac_model(this.Bac_model).subscribe(()=>{});
                  this.createService.createFin_model(this.Fin_model).subscribe(()=>{});

                  dialogConfig.data = {
                    title: 'Confirmation', description: 'Thank you for your Application.  It has been recieved successfully and will be processed in due course.'
                    , button1: 'OK', button2: '' 
                  };
                  this.dialog.open(matDialogComponent, dialogConfig);
                  this.selectedIndex = 0;
                  this.loadAppList();
              })
            } catch (e) {
            alert("There was a problem saving your data, please contact admin@ngnf.co.uk");
          }
        }
      }
    )
  }
}


var ELEMENT_DATA: ApplData[];
