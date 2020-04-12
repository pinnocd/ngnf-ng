import { Component, OnInit } from '@angular/core';
import { ApiReadService } from '../../services/api.readService';
import { ApiDeleteService } from '../../services/api.deleteService';

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
  
  
ngOnInit() {
  this.loadAppList();
}

  App_models:  App_model[];
  Org_models:  Org_model[];
  Con_models:  Con_model[];
  Gen_models:  Gen_model[];
  Bac_models:  Bac_model[];
  Fin_models:  Fin_model[];


  constructor(private apiService: ApiReadService, private apiDelService: ApiDeleteService) { }

  // Initial load of all applications
  loadAppList() {
    this.apiService.readAllApps().subscribe((App_models: App_model[])=>{
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

    this.apiService.readBac_model(app_model.ApplicationId).subscribe((Bac_models: Bac_model[])=>{
      this.Bac_models = Bac_models;
      console.log(this.Bac_models);
    })

    this.apiService.readFin_model(app_model.ApplicationId).subscribe((Fin_models: Fin_model[])=>{
      this.Fin_models = Fin_models;
      console.log(this.Fin_models);
    })
  }

  deleteApp(app_model){
    var msg = 'Are you absolutely sure you want to delete the ' + app_model.OrgName + ' application for project "' + app_model.GenName + '"?';

    if (confirm(msg)) {
      this.apiDelService.deleteApplication(app_model.ApplicationId).subscribe(()=>{
        console.log("Delete complete");
      });
    } 
    else
    { // No harm done then
    }
    this.loadAppList();
  }
}
