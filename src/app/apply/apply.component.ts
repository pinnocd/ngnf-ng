import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { matDialogComponent } from '../matDialog/matDialog.component';
import { ApiCreateService } from '../../services/api.createService';

import { Org_class } from  '../../models/Org_class';
import { Con_class } from  '../../models/Con_class';
import { Gen_class } from  '../../models/Gen_class';
import { Bac_class } from  '../../models/Bac_class';
import { Fin_class } from  '../../models/Fin_class';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})

export class ApplyComponent {
  Org_model = new Org_class();
  Con_model = new Con_class();
  Gen_model = new Gen_class();
  Bac_model = new Bac_class();
  Fin_model = new Fin_class();

  infoOpenState = false;
  selectedIndex = 0;

  constructor(private apiService: ApiCreateService, public dialog: MatDialog, private router: Router )  {

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
              this.apiService.createApp().subscribe(ApplicationId => {
                  var AppId: number;
                  AppId = ApplicationId as number;

                  console.log("The ApplicationId is " + AppId.toString());

                  this.Org_model.ApplicationId = AppId;
                  this.Con_model.ApplicationId = AppId;
                  this.Gen_model.ApplicationId = AppId;
                  this.Bac_model.ApplicationId = AppId;
                  this.Fin_model.ApplicationId = AppId;

                  this.apiService.createOrg_model(this.Org_model).subscribe(()=>{});
                  this.apiService.createCon_model(this.Con_model).subscribe(()=>{});
                  this.apiService.createGen_model(this.Gen_model).subscribe(()=>{});
                  this.apiService.createBac_model(this.Bac_model).subscribe(()=>{});
                  this.apiService.createFin_model(this.Fin_model).subscribe(()=>{});

                  dialogConfig.data = {
                    title: 'Confirmation', description: 'Thank you for your Application.  It has been recieved successfully and will be processed in due course.'
                    , button1: 'OK', button2: '' 
                  };
                  this.dialog.open(matDialogComponent, dialogConfig);
                  this.selectedIndex = 0;
                  this.router.navigate(['/myaccount']);

              })
            } catch (e) {
            alert("There was a problem saving your data, please contact admin@ngnf.co.uk");
          }
        }
      }
    )
  }
}
