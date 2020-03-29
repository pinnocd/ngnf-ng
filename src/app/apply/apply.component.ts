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

export class User {
  public name: string;
  public email: string;
  public password: string;
  public hobbies: string;
}

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  Org_model = new Organisation();

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
