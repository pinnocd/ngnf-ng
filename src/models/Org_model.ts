export class Org_model {

    constructor(
      public    ApplicationId: number,
      public    OrgName: string, 
      public    OrgAddress: string, 
      public    OrgPostcode: string, 
      public    OrgEmail: string, 
      public    OrgWebsite: string, 
      public    OrgType: string,
      public    OrgTypeName: string,
      public    OrgCharity: boolean, 
      public    OrgCharityNo: number, 
      public    OrgCompanyNo: number,
      public    OrgStartDate: Date, 
      public    OrgOpen: boolean, 
      public    OrgInfo: string

    ) {}
}