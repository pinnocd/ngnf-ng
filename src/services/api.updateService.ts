import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from  'rxjs';
import { ApiAdminService } from './api.adminService';
import * as myGlobals from 'globals';

import { Org_model } from  '../models/Org_model';
import { Con_model } from  '../models/Con_model';
import { Gen_model } from  '../models/Gen_model';
import { Bac_model } from  '../models/Bac_model';
import { Fin_model } from  '../models/Fin_model';

var token: string;
var userId: string;

@Injectable({
  providedIn: 'root'
})

export class ApiUpdateService {
    constructor(private httpClient: HttpClient, private adminService: ApiAdminService) {
        token = this.adminService.getToken();
        userId = token.split('|')[0];
     }

    updateApplication(ApplicationId, Status, ProposalWriter){
        let params = new HttpParams()
          .set('ApplicationId', ApplicationId)
          .set('Status', Status)
          .set('UserId', userId)
          .set('ProposalWriter', ProposalWriter )
          .set('SeniorApprover', userId );

        return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/update/updApp.php`, { params: params} )
    }

    updateUser(UserId, UserType){
        let params = new HttpParams()
          .set('UserId', UserId)
          .set('UserType', UserType);

        return this.httpClient.get(`${myGlobals.PHP_API_SERVER}/api/update/updUser.php`, { params: params} )
    }

    // update an Org row based on the entered form data
    updateOrg_model(Org_model: Org_model): Observable<Org_model>{

      console.log(Org_model);

        let params = new HttpParams()
          .set('ApplicationId', Org_model.ApplicationId.toString())
          .set('Orgname', Org_model.OrgName)
          .set('Orgaddress', Org_model.OrgAddress)
          .set('Orgpostcode', Org_model.OrgPostcode)
          .set('Orgemail', Org_model.OrgEmail)
          .set('Orgwebsite', Org_model.OrgWebsite)
          .set('Orgtype', Org_model.OrgType)
          .set('Orgcharity_no', '' + Org_model.OrgCharityNo.toString())
          .set('Orgstart_date', '' + Org_model.OrgStartDate.toString())
          .set('Orginfo', Org_model.OrgInfo)
          .set('UserId', userId);

        return this.httpClient.get<Org_model>(`${myGlobals.PHP_API_SERVER}/api/update/updOrg_model.php`, { params: params} );
    }

    // update a Con row based on the entered form data
    updateCon_model(Con_model: Con_model): Observable<Con_model>{
        let params = new HttpParams()
          .set('ApplicationId'      , Con_model.ApplicationId.toString())
          .set('Conname'            , Con_model.ConName)
          .set('Conposition'        , Con_model.ConPosition)
          .set('Condob'             , Con_model.ConDOB.toString())
          .set('Conaddress'         , Con_model.ConAddress)
          .set('Conpreaddress'      , Con_model.ConPreAddress)
          .set('Conlandlineno'      , Con_model.ConLandlineNo)
          .set('Conotherno'         , Con_model.ConOtherNo)
          .set('Conemail'           , Con_model.ConEmail)
          .set('Consenname'         , Con_model.ConSenName)
          .set('Consenposition'     , Con_model.ConSenPosition)
          .set('Consendob'          , Con_model.ConSenDOB.toString())
          .set('Consenaddress'      , Con_model.ConSenAddress)
          .set('Consenpreaddress'   , Con_model.ConSenPreAddress)
          .set('Consenlandlineno'   , Con_model.ConSenLandlineNo)
          .set('Consenotherno'      , Con_model.ConSenOtherNo)
          .set('Consenemail' 		    , Con_model.ConSenEmail)
          .set('UserId'             , userId);

        return this.httpClient.get<Con_model>(`${myGlobals.PHP_API_SERVER}/api/update/updCon_model.php`, { params: params} );
    }

    // update a Gen row based on the entered form data
    updateGen_model(Gen_model: Gen_model): Observable<Gen_model>{
        let params = new HttpParams()
          .set('ApplicationId', Gen_model.ApplicationId.toString())
          .set('Genname', Gen_model.GenName)
          .set('Genstartdate', '' + Gen_model.GenStartDate.toString())
          .set('Genachieve', Gen_model.GenAchieve)
          .set('Genproblem', Gen_model.GenProblem)
          .set('Genvulnerables', Gen_model.GenVulnerables.toString())
          .set('Gensafeguards', Gen_model.GenSafeguards.toString())
          .set('Gennotes', Gen_model.GenNotes)
          .set('UserId', userId);
          
        return this.httpClient.get<Gen_model>(`${myGlobals.PHP_API_SERVER}/api/update/updGen_model.php`, { params: params} );
    }

    // update a Bac row based on the entered form data
    updateBac_model(Bac_model: Bac_model): Observable<Bac_model>{

      console.log(Bac_model);

        let params = new HttpParams()
          .set('ApplicationId', Bac_model.ApplicationId.toString())
          .set('Bacneed', Bac_model.BacNeed)
          .set('Bactarget', Bac_model.BacTarget)
          .set('Bacactivities', Bac_model.BacActivities)
          .set('Bacdeliver', Bac_model.BacDeliver)
          .set('Bacusers', Bac_model.BacUsers)
          .set('UserId', userId);

        return this.httpClient.get<Bac_model>(`${myGlobals.PHP_API_SERVER}/api/update/updBac_model.php`, { params: params} );
    }

    // update a Fin row based on the entered form data
    updateFin_model(Fin_model: Fin_model): Observable<Fin_model>{

      console.log(Fin_model);

      let params = new HttpParams()
          .set('ApplicationId', Fin_model.ApplicationId.toString())
          .set('Finorgname', Fin_model.FinOrgName)
          .set('Finbank', Fin_model.FinBank)
          .set('Finsortcode', Fin_model.FinSortCode)
          .set('Finbankorgaddress', Fin_model.FinBankOrgAddress)
          .set('Finactivity', Fin_model.FinActivity)
          .set('Fincapital', Fin_model.FinCapital.toString())
          .set('Finrevenue', Fin_model.FinRevenue.toString())
          .set('Finauditedaccounts', Fin_model.FinAuditedAccounts.toString())
          .set('UserId', userId);

        return this.httpClient.get<Fin_model>(`${myGlobals.PHP_API_SERVER}/api/update/updFin_model.php`, { params: params} );
    }
}
