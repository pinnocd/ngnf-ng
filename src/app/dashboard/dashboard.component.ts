import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ApiReadService } from '../../services/api.readService';
import { ApiDeleteService } from '../../services/api.deleteService';
import { ApiCreateService } from '../../services/api.createService';
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

import { ApplData, OrgTypes } from '../../interfaces/globalinterfaces';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['ApplicationId', 'User', 'OrgName', 'GenName', 'GenStartDate', 'Status', 'InsertDateTime', 'Submit', 'Delete'];
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
  OrgTypes: OrgTypes[];

  selectedRowIndex: number = -1;
  selectedIndex = 0;
  username = '';
  userId = '';
  ApplicationId = 0;
  AppStatus:string = "";
  pWriter = "";
  totalCost: number = 0;

  constructor(private readService: ApiReadService,  private deleteService: ApiDeleteService,
              private adminService: ApiAdminService, private createService: ApiCreateService,
              private updateService: ApiUpdateService, public dialog: MatDialog, public Matselect: MatSelectModule) {
                    // update data in data source when available
                  let token = this.adminService.getToken();

                  // Example token = 2|A|dean_pinnock@yahoo.com|Dean Pinnock
                  this.username = token.split('|')[3];
                  this.userId = token.split('|')[0];
                  let userType = token.split('|')[1];
              
                  switch (userType) {
                    case 'A':
                      // Admin users see everything so blank the id.
                      this.userId = ""; 
                      break;
                    case 'P': 
                      // Proposal Writer so set the value
                      this.pWriter = this.userId;
                      this.userId = ""; 
                      break;
                  }
                  this.readService.readOrgTypes().subscribe(OrgTypes => this.OrgTypes = OrgTypes);
                }

  // Initial load of all applications
  loadAppList() {
    this.ApplicationId = 0;
    this.selectedIndex = 0;
    this.AppStatus = "";
    
    this.readService.readApplications(this.userId, this.pWriter, "Yes")
      .subscribe(newData => this.dataSource.data = newData);
  }

  appReset(){
    this.Org_Model.length = 0;
    this.Con_Model.length = 0;
    this.Gen_Model.length = 0;
    this.Bac_Model.length = 0;
    this.Fin_Model.length = 0;        
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

    })
  }

  submitData(element) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm',
      description: 'Are you sure you want to submit your ' + element.OrgName + ' application for project "' + element.GenName + '" to be reviewed?',
      button1: 'Yes',
      button2: 'No'
    };

    const diaret = this.dialog.open(matDialogComponent, dialogConfig);

    diaret.afterClosed().subscribe(
      data => { 
        if (data) {
          this.updateService.updateApplication(element.ApplicationId, 'S', '').subscribe(()=>{
            dialogConfig.data = {
              title: 'Confirmation', description: 'Thank you for submitting your Application.  We will process it and contact you in due course.'
              , button1: 'OK', button2: '' 
            };

            this.dialog.open(matDialogComponent, dialogConfig);
            this.appReset();
            this.loadAppList();
          });
        } 
      }
    );
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
          try {
              this.deleteService.deleteApplication(element.ApplicationId).subscribe(()=>{
                  dialogConfig.data = {
                    title: 'Confirmation', description: 'Your Application has been successfully deleted.'
                    , button1: 'OK', button2: '' 
                  };

                  this.dialog.open(matDialogComponent, dialogConfig);

              });
              this.appReset();
              this.loadAppList();
            } 
           catch (e) {
              console.log(e);
              alert("There was a problem deleting your application, please contact admin@ngnf.co.uk");
           }
          }
        }
    );
  }  

  insertApp(){
    this.ApplicationId = 0;
    this.AppStatus = "New";

    this.Org_model = new Org_class();
    this.Con_model = new Con_class();
    this.Gen_model = new Gen_class();
    this.Bac_model = new Bac_class();  
    this.Fin_model = new Fin_class();

    // Set the default values where necessary
    this.Org_model.OrgCharity = false;
    this.Org_model.OrgOpen = false;
    this.Org_model.OrgCharityNo = 0;
    this.Org_model.OrgCompanyNo = 0;
    this.Org_model.OrgStartDate = new Date("0000-00-00");

    this.Con_model.ConDOB = new Date("");
    this.Con_model.ConSenDOB = new Date("");

    this.Gen_model.GenVulnerables = false;
    this.Gen_model.GenSafeguards = false;
    this.Gen_model.GenStartDate = new Date("");

    this.Fin_model.FinCost = 0;
    this.Fin_model.FinRevenue = 0;
    this.Fin_model.FinCapital = 0;
    this.Fin_model.FinAuditedAccounts = false;

    if (this.username === 'Dean Pinnock') {
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
            this.Org_model.OrgName = "BLM";
            this.Org_model.OrgAddress = "43 Unknown St, Huddersfield";
            this.Org_model.OrgPostcode = "HD1 1LS";
            this.Org_model.OrgEmail = "sampleemail@blm.com";
            this.Org_model.OrgWebsite = "http://www.blm.co.uk/";
            this.Org_model.OrgType = "C";
            this.Org_model.OrgCharity = true;
            this.Org_model.OrgCharityNo = 1129873;
            this.Org_model.OrgStartDate = new Date("");
            this.Org_model.OrgOpen = true;
            this.Org_model.OrgInfo = "n/a";
        
            this.Con_model.ConName = "Garza Cullors Tometi";
            this.Con_model.ConLandlineNo = "";
            this.Con_model.ConOtherNo = "07710 000000";
            this.Con_model.ConEmail = "contact@blm.com";
            this.Con_model.ConSenName = "";
            this.Con_model.ConSenLandlineNo = "";
            this.Con_model.ConSenOtherNo = "";
            this.Con_model.ConSenEmail = "";

            this.Gen_model.GenName = "Womens Projects";
            this.Gen_model.GenStartDate = new Date("");
            this.Gen_model.GenAchieve = "•	Members will have a better mental health situation as they have hope that they have an organisation who they can contact for support and assistance. " +
            "•	Individuals who have a long term illness e.g. arthritis, heart condition, depression, diabetes and other Covid-19 compromising underlying medical conditions, will worry less about where to get food, toiletries, and some over the counter (OTC)  medication, eg. paracetamol, rub-ins or creams which can be purchased for them on request. " +
            "•	Families of lonely members will have peace of mind that their family members are being taken care of during this period and they will not have to travel long distance to ensure their parents are keeping well." +
            "•	Creativity of the youths will be gingered up as we plan to get them involved in quizzes, competitive art/game activities to get their minds off Covid-19 and its connotations." +
            "•	BLM group also engages in offering spiritual needs and people in distress often call us for prayers as they find our group more accessible than the regular church they attend." +
            "•	Pastors in the group will network and come up with ideas on how to support their members appropriately during this period. They also minster to women at the risk of becoming homeless, and sign post them to professional advice e.g. to Crisis, Shelter, Council." +
            "•	We respond promptly to requests for prayers and offer group or one to one prayer sessions. In this present situation prayers will be offered using the telephone or via online digital apps – ZOOM for group prayers, WhatsApp groups for communication and relaying information. " +
            "•	To enable this we are going to offer training to up skill members on how to use the internet and engage in online meetings, prayer activities and meeting other requests.";
            this.Gen_model.GenProblem = "";
            this.Gen_model.GenVulnerables = true;
            this.Gen_model.GenSafeguards = true;

            this.Bac_model.BacNeed = "BLM is a registered women’s charity group set up with the aim of meeting the needs of battered women and women in crisis; physically, mentally and spiritually. We are committed to upholding the dignity of womanhood universally, irrespective of nationality, race, or denomination. The group also promotes the dignity of womanhood and the relevance of women in things temporal and spiritual. It provides relief to widows, single mothers and women in distress, uplifting and empowering them. Our values are to Engage, Enable and Empower women." +
            "We have 44 core women members in this group. Some of them are bereaved, including some bereaved due to Covid-19, and many of them and their families are now suffering from mental health related issues. Some belong to Covid-19 vulnerable group due to having underlying health issues e.g. diabetes, stress, heart disease, blood pressure; and are afraid to leave their homes even for shopping. Some of them are over 65 years, and the majority are from the Black ethnic minority group, who are most vulnerable to death from Covid-19 related complications.";
            this.Bac_model.BacTarget = "Our overall focus is to enhance participation in community events.";
            this.Bac_model.BacActivities = "Weekly residential home visits for children";
            this.Bac_model.BacDeliver = "Deliver Mansfield positive results.";
            this.Bac_model.BacUsers = "Mainly volunteers but some professionals due to safeguards.";

            this.Fin_model.FinActivity = "";
            this.Fin_model.FinCost = 0;
          } 
        }
      );
    }
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

          // set defaults
          if(!this.Fin_model.FinAuditedAccounts){this.Fin_model.FinAuditedAccounts = false;}

          if (this.ApplicationId === 0) {
              try{
                  this.createService.createApp().subscribe(ApplicationId => {
                      var AppId: number;
                      AppId = ApplicationId as number;

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
                        title: 'Confirmation', description: 'Your Application was successfully created, the Unique Reference Id is ' + AppId + '.'
                        , button1: 'OK', button2: '' 
                      };
                      this.dialog.open(matDialogComponent, dialogConfig);
                      this.appReset();
                      this.loadAppList();
                  })
                } catch (e) {
                  console.log(e);
                  alert("There was a problem saving your data, please contact admin@ngnf.co.uk");
              }
              } else {
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
                    this.appReset();
                    this.loadAppList();
                } catch (e) {
                    console.log(e);
                    alert("There was a problem updating your data, please contact admin@ngnf.co.uk");
                }
              }
          }
      }
    )
  }
}

var ELEMENT_DATA: ApplData[];
