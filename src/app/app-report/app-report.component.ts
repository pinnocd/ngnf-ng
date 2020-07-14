import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiReadService } from '../../services/api.readService';

import { App_model } from  '../../models/App_model';
import { Org_model } from  '../../models/Org_model';
import { Con_model } from  '../../models/Con_model';
import { Gen_model } from  '../../models/Gen_model';
import { Bac_model } from  '../../models/Bac_model';
import { Fin_model } from  '../../models/Fin_model';
import { User_model } from '../../models/User_class';
import { ApplData, FundProviders, OrgTypes } from '../../interfaces/globalinterfaces';
import { Statuses_model } from '../../models/Statuses_model';

@Component({
  selector: 'app-app-report',
  styleUrls: ['app-report.component.css'],
  templateUrl: 'app-report.component.html',
})


export class AppReportComponent implements OnInit {
  displayedColumns: string[] = ['ApplicationId', 'OrigApplicationId', 'User', 'OrgName', 'GenName', 'GenStartDate', 'Status', 
           'ProposalWriter', 'SeniorApprover', 'FundProvider', 'OrganisationType', 'InsertDateTime'];
  dataSource = new MatTableDataSource<ApplData>(ELEMENT_DATA);

  // Store the raw data for user later
  rawdata = new MatTableDataSource<ApplData>(ELEMENT_DATA);
  
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

  User_models: User_model[];
  SAUser_models: User_model[];
  FundProvider_models: FundProviders[];
  OrgType_models: OrgTypes[];
  Status_models: Statuses_model[];

  Status: string = '';
  ProposalWriter: string = '';
  SeniorApprover: string = '';
  FundProvider: string = '';
  OrgType: string = '';

  selectedRowIndex: number = -1;

  constructor(private readService: ApiReadService) { }

  // Initial load of all applications
  loadAppList() {
    // update data in data source when available
    this.readService.readApplications("", "", "Yes").subscribe(newData => {
      this.dataSource.data = newData;
      this.rawdata.data = newData;
      });

    // Load filter data
    this.readService.readAllUsers("StaffMember").subscribe((User_models: User_model[]) => {
      this.User_models = User_models;
      let blankUser =  {} as User_model;
      blankUser.name = '';
      blankUser.usertype = 'Admin';
      this.User_models.push(blankUser);

      this.SAUser_models = this.User_models.filter(x => x.usertype === 'Admin');
    })

    this.readService.readAllFundProviders().subscribe((FundProvider_models: FundProviders[]) => {
      this.FundProvider_models = FundProvider_models;

      let blankFP = {} as FundProviders;
      blankFP.FundProviderCode = '';
      blankFP.FundProviderName = '';
      this.FundProvider_models.push(blankFP);
    });

    this.readService.readStatuses().subscribe((Status_model: Statuses_model[]) => {
      this.Status_models = Status_model;

      let blankStatus = {} as Statuses_model;
      blankStatus.StatusCode = '';
      blankStatus.StatusName = '';
      this.Status_models.push(blankStatus);
    });


    this.readService.readOrgTypes().subscribe((OrgType_models: OrgTypes[]) => {
      this.OrgType_models = OrgType_models;

      let blankOrgType = {} as OrgTypes;
      blankOrgType.OrgTypeCode = '';
      blankOrgType.OrgTypeName = '';
      this.OrgType_models.push(blankOrgType);
     });

  }

  filterData(field, value) {
  
    console.log(value.source.value);
    // Filter data based on the selected criteria
    switch (field) {
      case 'Status':
        this.Status = value.source.value;
        break;

      case 'PW':
        this.ProposalWriter = value.source.value;
        break;

      case 'SA':
        this.SeniorApprover = value.source.value;
        break;

      case 'FP':
        this.FundProvider = value.source.value;
        break;

      case 'OT':
        this.OrgType = value.source.value;
        break;

      default :
        console.log("I'm confused");
        break;
    }

    this.dataSource.data = this.rawdata.data;

    // Filter data if values set
    if (this.Status!='') {this.dataSource.data = this.dataSource.data.filter(x => x.Status === this.Status);}
    if (this.SeniorApprover!=''){this.dataSource.data = this.dataSource.data.filter(x => x.SeniorApprover === this.SeniorApprover);}
    if (this.ProposalWriter!=''){this.dataSource.data = this.dataSource.data.filter(x => x.ProposalWriter === this.ProposalWriter);}
    if (this.FundProvider!=''){this.dataSource.data = this.dataSource.data.filter(x => x.FundProvider === this.FundProvider);}
    if (this.OrgType!=''){this.dataSource.data = this.dataSource.data.filter(x => x.OrgType === this.OrgType);}
  }

  // An application has been selected in the list, so refresh all data
  selectApp(app_model){
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
}

var ELEMENT_DATA: ApplData[];
