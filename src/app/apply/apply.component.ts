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

export class Finance {
  public orgname: string;
  public bank: string;
  public account: string;
  public sortcode: string;
  public bankorgaddress: string;
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
  Fin_model = new Finance();

  OrgTypes: string[] = [
    'Voluntary or community',
    'School',    
    'Health body',
    'Parish or town council'
  ];

  constructor() { 
    // Set up default sample data
    this.Org_model.name = "Fredrick Pollock Organisation";
    this.Org_model.address = "43 Alperce Street, Mansfield, Yorkshire";
    this.Org_model.postcode = "NF5 6GF";
    this.Org_model.email = "fill.ball@grep.com";
    this.Org_model.website = "https://www.dailydot.com/parsec/mcu-movies-order-marvel-cinematic-universe-timeline/";
    this.Org_model.type = "School";
    this.Org_model.charity = true;
    this.Org_model.charity_no = 6702932;
    this.Org_model.start_date = new Date("1998-12-22"); //new Date("2019-01-16");  //"23-JAN-1998";
    this.Org_model.open = false;
    this.Org_model.info = "The three-hour conclusion to the Infinity Saga (and the direct sequel to Infinity War) delivered the end that we expected: the surviving Avengers reversed Thanos’ snap, bringing back the MCU’s fallen heroes and half the universe. But before it gets there, Avengers: Endgame took its time to allow those who remained to grieve, leading to an improbable time heist to grab the Infinity Stones from the past—and visit previous MCU films. But Thanos’ final defeat doesn’t come without sacrifices and reflection. Black Widow sacrificed herself on Vormir, Iron Man sacrificed himself to deliver the final blow to Thanos, Thor passed on his crown to Valkyrie, and Captain America stayed in the past after returning the Infinity Stones and grew old before passing on his shield to Sam Wilson. —Michelle Jaworski";

    this.Gen_model.problem = "kjehrkjherbfkjhbrf";
  }

  onSubmit(form) {
    console.log(form.value)
  }
}
