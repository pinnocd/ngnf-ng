import { Component } from '@angular/core';
import { Hero } from '../models/hero'

export class Organisation {
  public name: string;
  public address: string;
  public postcode: string;
  public email: string;
  public website: string;
  public type: string;
  public charity: boolean;
  public charity_no: number;
  public start_date: Date;
  public open: boolean;
  public info: string;
}

export class Contact {
  public name: string;
  public dob: string;
  public address: string;
  public preaddress: string;
  public landlineno: string;
  public otherno: string;
  public email: string;
  public senname: string;
  public sendob: string;
  public senaddress: string;
  public senpreaddress: string;
  public senlandlineno: string;
  public senotherno: string;
  public senemail: string;
}

export class General {
  public name: string;
  public startdate: string;
  public achieve: string;
  public problem: string;
  public vulnerables: string;
  public safeguards: string;
}

export class Background {
  public need: string;
  public target: string;
  public activities: string;
  public deliver: string;
  public users: string;
}

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  Org_model = new Organisation();
  Con_model = new Contact();
  Gen_model = new General();
  Bac_model = new Background();

  OrgTypes: string[] = [
    'Voluntary or community',
    'School',    
    'Health body',
    'Parish or town council'
  ];

  constructor() { }

  onSubmit(form) {
    console.log(form.value)
  }
}
