export class App_model {

    constructor(
      public    ApplicationId: number,
      public    User: string,
      public    OrgName: string, 
      public    GenName: string,
      public    GenStartDate: Date,
      public    Status: string,
      public    ProposalWriter: string,
      public    SeniorApprover: string,
      public    InsertDateTime:Date,
    ) {}
}
