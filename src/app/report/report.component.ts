import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { App_model } from  '../../models/App_model';
import { Org_model } from  '../../models/Org_model';
import { Con_model } from  '../../models/Con_model';
import { Gen_model } from  '../../models/Gen_model';
import { Bac_model } from  '../../models/Bac_model';
import { Fin_model } from  '../../models/Fin_model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
  App_models:  App_model[];
  selectedApp:  App_model  = {  ApplicationId: null,  OrgName: null, GenName: null, GenStartDate: null,
                                Status: null,         InsertDateTime:null
                              };

  Org_models: Org_model[];
  SelectedOrg: Org_model = {  ApplicationId: null,  OrgName: null,      OrgAddress: null, OrgPostcode: null, 
                              OrgEmail: null,       OrgWebsite: null,   OrgType: null,    OrgCharity: null, 
                              OrgCharityNo: null,   OrgStartDate: null, OrgOpen: null,    OrgInfo: null
                            };

  Con_models:  Con_model[];
  selectedCon:  Con_model  = {  ApplicationId: null,    ConName: null,        ConDOB: null,         ConAddress: null,
                                ConPreAddress: null,    ConLandlineNo:null,   ConOtherNo: null,     ConEmail: null,
                                ConSenName: null,       ConSenDOB: null,      ConSenAddress: null,  ConSenPreAddress: null,  
                                ConSenLandlineNo:null,  ConSenOtherNo: null,  ConSenEmail: null
                              };

  Gen_models:  Gen_model[];
  selectedGen:  Gen_model  = {  ApplicationId: null,  GenName: null,        GenStartDate: null, GenAchieve: null,
                                GenProblem: null,     GenVulnerables:null,  GenSafeguards: null
                              };

  Bac_models:  Bac_model[];
  selectedBac:  Bac_model  = {  ApplicationId: null,  BacNeed: null,        BacTarget: null,    BacActivities: null,
                                BacDeliver: null,     BacUsers: null
                              };

  Fin_models:  Fin_model[];
  selectedFin:  Fin_model  = {  ApplicationId: null,  FinOrgName: null,        FinBank: null, FinAccount: null,
                                FinSortCode: null,    FinBankOrgAddress:null
                              };


  constructor(private apiService: ApiService) { }

    ngOnInit() {
      this.apiService.readApplications().subscribe((App_models: App_model[])=>{
        this.App_models = App_models;
        console.log(this.App_models);
        console.log('Initial Application list loaded');
      })

    }

  // An application has been selected in the list, so refresh all data
  selectApp(app_model){
    console.log(app_model);

    this.apiService.readOrg_model(app_model.ApplicationId).subscribe((Org_models: Org_model[])=>{
      this.Org_models = Org_models;
      console.log(this.Org_models);
    })

    this.apiService.readCon_model(app_model.ApplicationId).subscribe((Con_models: Con_model[])=>{
      this.Con_models = Con_models;
      console.log(this.Con_models);
    })

    this.apiService.readGen_model(app_model.ApplicationId).subscribe((Gen_models: Gen_model[])=>{
      this.Gen_models = Gen_models;
      console.log(this.Gen_models);
    })

    this.apiService.readBac_model(app_model.ApplicationId).subscribe((_models: Bac_model[])=>{
      this.Bac_models = _models;
      console.log(this.Bac_models);
    })

    this.apiService.readFin_model(app_model.ApplicationId).subscribe((_models: Fin_model[])=>{
      this.Fin_models = _models;
      console.log(this.Fin_models);
    })
  }
}