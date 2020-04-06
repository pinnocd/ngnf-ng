import { Component } from '@angular/core';
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

  OrgTypes: string[] = [
    'Voluntary or community',
    'School',    
    'Health body',
    'Parish or town council'
  ];

  constructor(private apiService: ApiCreateService)  {

    // Set up default sample data
    this.Org_model.OrgName = "HUDDERSFIELD AFRICAN CARIBBEAN CULTURAL TRUST";
    this.Org_model.OrgAddress = "5-7 STATION STREET, HUDDERSFIELD";
    this.Org_model.OrgPostcode = "HD1 1LS";
    this.Org_model.OrgEmail = "huddersfieldcmc@gmail.com";
    this.Org_model.OrgWebsite = "http://hacct.co.uk/carnival2020.org";
    this.Org_model.OrgType = "Voluntary or community";
    this.Org_model.OrgCharity = true;
    this.Org_model.OrgCharityNo = 1129873;
    this.Org_model.OrgStartDate = new Date("09/02/2009");
    this.Org_model.OrgOpen = true;
    this.Org_model.OrgInfo = "n/a";
 
    this.Con_model.ConName = "SARA DEARNLEY";
    this.Con_model.ConDOB = new Date("1974-02-02");
    this.Con_model.ConAddress = "12 FULFORD AVE, FARTOWN, HUDDERSFIELD. HD2 2QS";
    this.Con_model.ConPreAddress = "";
    this.Con_model.ConLandlineNo = "";
    this.Con_model.ConOtherNo = "07717 154575";
    this.Con_model.ConEmail = "sara_dearnley@hotmail.com";
    this.Con_model.ConSenName = "Paige Phillip";
    this.Con_model.ConSenDOB = new Date("07/31/1993");
    this.Con_model.ConSenAddress = "62 Blackhouse Road, Huddersfield, HD2 1AR";
    this.Con_model.ConSenPreAddress = "";
    this.Con_model.ConSenLandlineNo = "";
    this.Con_model.ConSenOtherNo = "07715 902349";
    this.Con_model.ConSenEmail = "paigephillip@hotmail.co.uk";

    this.Gen_model.GenName = "Huddersfield Carnival 2020";
    this.Gen_model.GenStartDate = new Date("03/01/2020");
    this.Gen_model.GenAchieve = "To bring a refreshed Caribbean themed Carnival to the diverse community of Huddersfield. ";
    this.Gen_model.GenProblem = "This project will provide activities for children and young people to keep them from engaging.";
    this.Gen_model.GenVulnerables = '1';
    this.Gen_model.GenSafeguards = '1';

    this.Bac_model.BacNeed = "The need, vision and direction of the projectsappointment to the residents and visitors to the event but the economy has also felt a hit on the traditional carnival weekend. ";
    this.Bac_model.BacTarget = "Our overall focus is to enhance participation in carnival. As part of our business plan we have broken down our target groups. please see additional pages";
    this.Bac_model.BacActivities = "Weekly Steel Pan Playing classes for beginners and for children";
    this.Bac_model.BacDeliver = "HACCT has deliver Huddersfield in the past with positive results.";
    this.Bac_model.BacUsers = "The planning of Huddersfield Carnival 2020 is currently being carried project.";

    this.Fin_model.FinOrgName = "Huddersfield African Caribbean Cultural Trust (HACCT)";
    this.Fin_model.FinBank = "Royal Bank of Scotland, 27 Market Place, Huddersfield, HD1 2AD";
    this.Fin_model.FinAccount = 12283929;
    this.Fin_model.FinSortCode = "16-22-04";
    this.Fin_model.FinBankOrgAddress = "5-7 Station Street, Huddersfield, HD1 1LS";
  }

  Submit_Data() {

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
    })
  }
}