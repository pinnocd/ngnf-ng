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
  public vulnerables: boolean;
  public safeguards: boolean;
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
    this.Org_model.name = "HUDDERSFIELD AFRICAN CARIBBEAN CULTURAL TRUST";
    this.Org_model.address = "5-7 STATION STREET, HUDDERSFIELD";
    this.Org_model.postcode = "HD1 1LS";
    this.Org_model.email = "huddersfieldcmc@gmail.com";
    this.Org_model.website = "http://hacct.co.uk/carnival2020.org";
    this.Org_model.type = "Voluntary or community";
    this.Org_model.charity = true;
    this.Org_model.charity_no = 1129873;
    this.Org_model.start_date = new Date("2009-02-09"); //new Date("2019-01-16");  //"23-JAN-1998";
    this.Org_model.open = true;
    this.Org_model.info = "n/a";
 
    this.Con_model.name = "SARA DEARNLEY";
    this.Con_model.dob = "11/22/74";
    this.Con_model.address = "12 FULFORD AVE, FARTOWN, HUDDERSFIELD. HD2 2QS";
    this.Con_model.preaddress = "";
    this.Con_model.landlineno = "";
    this.Con_model.otherno = "07717 154575";
    this.Con_model.email = "sara_dearnley@hotmail.com";
    this.Con_model.senname = "Paige Phillip";
    this.Con_model.sendob = "07/31/1993";
    this.Con_model.senaddress = "62 Blackhouse Road, Huddersfield, HD2 1AR";
    this.Con_model.senpreaddress = "";
    this.Con_model.senlandlineno = "";
    this.Con_model.senotherno = "07715 902349";
    this.Con_model.senemail = "paigephillip@hotmail.co.uk";


    this.Gen_model.name = "Huddersfield Carnival 2020";
    this.Gen_model.startdate = "03/01/2020";
    this.Gen_model.achieve = "To bring a refreshed Caribbean themed Carnival to the diverse community of Huddersfield. Our goal is to celebrate, cultivate and advocate for the African and Caribbean culture in Huddersfield and beyond. We also aim to enhance the skills, display and participation of Masquerade troupes within Huddersfield and wider boroughs of Kirklees. These skills will be developed through skills-gap workshops focusing on the expertise of craft making, wire bending, foam shaping and working with mixed materials, feathers and trims. HACCT will employ skilled carnival design technicians who will lead, deliver and appraise the skill enhancing program(mes). The learnt skills will allow the masquerade leaders and their chosen models to create unique Caribbean themed costumes and showcase them at the carnival launch event scheduled to be held in spring 2020. Our 2020 event aspires to offer several genres of music of black origin at the Carnival celebrations held at Greenhead Park where the parade concludes. Genres will include soca & calypso, reggae & Dancehall, Soul & RNB, offered in arenas within and/or surrounding the park. The goal is to create a festival like atmosphere where most musical tastes can be satisfied, providing an event which can be enjoyed by all backgrounds. Huddersfield Carnival Management Committee desire to encourage the musical artistry and performances for youths aged 11 to 25 by offering a dedicated stage/platform at Greenhead park, where they can showcase their talent. This will all stem from a competition called Huddz Got Talent, where young people will participate in a talent show with a range of categories. The winners will have the opportunity to perform on a carnival float and/or the main stage. Artistes will also will also be chosen in line with the CMC Artistic policy ensuring inclusion and diversity is withheld whilst supporting young people to develop the quality of their musical skills. Finally, as part of our project and to maintain traditions and cultures, CMC aim to bring steel pan back to the heart of carnival. We have been lucky to identify instructors and some instruments that can be loaned for some workshops to develop steel band classes and workshops in the community as well as looking into developing projects with schools to develop clubs to teach children learn how to play steel pan and its history. These workshops will initially be aimed at children aged 9 to 14 and we hope to have a schools panorama in the lead up to the event and have the winners perform on stage. Overall our project aim is to encourage participation for all age groups either as spectators, participants, stakeholders and/or organisers and ensure the tradition and legacy of carnival can continue in Huddersfield.";
    this.Gen_model.problem = "This project will work to address divisions within ethnic communities – aiding the cohesion of all residents from within Kirklees and afar. It will allow all ethnicities and backgrounds to come together for a day of fun and celebration of Caribbean Culture. " +
      "The projects will allow an opportunity to educate about Caribbean traditions including developing a programme to deliver artistic skills workshops to those interested in costume design and development. " +
      "We hope to increase the participation from diverse communities to actively engage with carnival activities; including in the parade from persons/groups who are not part of the African Caribbean community by being more inclusive and open. " +
      "We hope that the projects and events we offer will provide activities for children and young people to keep them from engaging in antisocial behavior or crime and help engage the young adult generation to engage in positive skill developing workshops and thus reduce risk to vulnerable young people. Our project will provide an opportunity for young people and to develop their artistic skills and offer a platform for them to display their work whether it be through song, dance or costume creation. Engage with young people to channel their energy into more positive outcomes and recognition. " +
      "We would also like to use carnival as an opportunity to bridge divisions between Caribbean countries. Unfortunately, there can be discord between island cultures and we want carnival to welcome all from the Caribbean and a far. We want to give other Caribbean organisations within Huddersfield, such as Jamaica nationals; an opportunity to platform to display their projects and island traditions.";
    this.Gen_model.vulnerables = true;
    this.Gen_model.safeguards = true;

    this.Bac_model.need = "The need, vision and direction of the project is to educate the community of Huddersfield and the wider community of Yorkshire about the history, culture, traditions and the positive celebrations of the African Caribbean ancestry Due to a lack of Funding and Infrastructure HACCT was unable to host Carnival 2019. HACCT have used the past 12 months to re-evaluate how the carnival is organised and delivered. A new team has been empowered to deliver Carnival 2020. The Huddersfield Carnival Management Committee (CMC) have carried out surveys online and face to face at local events in June 2019. The data captured through this source has been broken down and analysed by the 2 evaluation officers. This has allowed us to understand the requirements of the community. Almost 100 surveys were completed and the results confirm that returning to Greenhead Park is a key issue for some of the most committed and interested participants in Carnival.    Concerns about security are mentioned by a significant proportion with some giving it as a reason for no longer attending.  Please see attached report on the survey for further details. " + 
      "CMC have also carried out a local radio interview and held a public meeting to encourage team members to join. CMC have also set up 2 focus groups. These are masquerade leaders focus group, & Sound systems and DJs focus group. There is also a dedicated Social Media Officer who captures feedback on Facebook, Instagram and twitter, with over 10k followers there is no doubt that the community want their carnival to return. " +
      "The absence of carnival in greenhead park has not only been a huge disappointment to the residents and visitors to the event but the economy has also felt a hit on the traditional carnival weekend. ";
    this.Bac_model.target = "Our overall focus is to enhance participation in carnival. As part of our business plan we have broken down our target groups. please see additional pages";
    this.Bac_model.activities = "Weekly Steel Pan Playing classes for beginners and intermediary interested parties, also steel band project with schools culminating in a school's panorama event. The skills learnt will be exhibited at fundraising events 2020 and form a major part of the Carnival celebrations on 11th July 2020. " +
      "Costume making workshops – Mas making including wire bending, foam craft and feather arrangement skills taught to create complimentary head pieces that will enhanced and beautify the array of costumes on offer. It will allow mas band leaders to improve their skills in costume creation. These workshops will continues based on the skill requirements of the masquerade troupes. " +
      "Display of the proposed costumes for 2020 by each of the participating masquerade bands at the Launch event in spring 2020. The aim is launch early to maximise participation for masqueraders, and costume makers. overall this should improve the showcase of costumes in the parade. Where mas bands offer dance classes allow person taking part to perfect their routines, and improve their fitness. The launch event will be the kick start to carnival 2020 " +
      "Carnival day – Parade & Park festival. We would like to include african drumming activities in the park as well as possible craft making opportunities for children";
    this.Bac_model.deliver = "HACCT has deliver Huddersfield in the past with positive results. " +
      "There is a strong history of good carnivals that have been held previously in Huddersfield" +
      "There is a good infrastructure now CMC has been established. " +
      "CMC are working in partnership with other community groups" +
      "There is the drive from the community who want carnival celebrations back in Huddersfield Greenhead Park for 2020 and beyond" +
      "CMC have a Business Approach to the planning and organisation of Huddersfield carnival, ensuring activities and methods are evaluated, and scrutinized to maximise and improve outcomes";
    this.Bac_model.users = "The planning of Huddersfield Carnival 2020 is currently being carried out by CMC a team of 19 Volunteers. " +
      "The intelligence obtained through research shows, skilled professionals, craftsmen and lecturers are required for the successful delivery of the supporting workshops." +
      "There will also be need for some employed personnel to carry out general duties between March to September 2020." +
      "There will be the need for casual volunteers throughout the project.";

    this.Fin_model.orgname = "Huddersfield African Caribbean Cultural Trust (HACCT)";
    this.Fin_model.bank = "Royal Bank of Scotland, 27 Market Place, Huddersfield, HD1 2AD";
    this.Fin_model.account = "12283929";
    this.Fin_model.sortcode = "16-22-04";
    this.Fin_model.bankorgaddress = "5-7 Station Street, Huddersfield, HD1 1LS";
  }
 
  onSubmit(form) {
    console.log(form.value)
  }
}
