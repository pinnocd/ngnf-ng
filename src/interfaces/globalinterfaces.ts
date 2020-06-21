export interface ApplData{
    ApplicationId: number;
    User: string;
    OrgName: string;
    GenName: string;
    GenStartDate: Date;
    Status: string;
    ProposalWriter: string;
    SeniorApprover: string;
    InsertDateTime: Date;
  }

export interface UserData{
    id: number;
    name: string;
    email: string;
    usertype: string;
  }

export interface StatusData {
    StatusCode: string;
    StatusDesc: string;
  }
  
export interface AppActions {
    ActionCode: string;
    ActionDesc: string;
  }

export interface FundProviders {
    FundProviderCode: string;
    FundProviderName: string;
  }

  