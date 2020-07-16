import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiDeleteService } from '../../services/api.deleteService';
import { matDialogComponent } from '../matDialog/matDialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

import { OrgTypes } from '../../interfaces/globalinterfaces';


@Component({
  selector: 'app-orgtype-admin',
  templateUrl: './orgtype-admin.component.html',
  styleUrls: ['./orgtype-admin.component.css']
})
export class OrgtypeAdminComponent implements OnInit {
  OTColumns: string[] = ['OrgTypeCode', 'OrgTypeName', 'Delete'];
  OTData = new MatTableDataSource<OrgTypes>(OT_DATA);

  constructor(private readService: ApiReadService, private deleteService: ApiDeleteService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadOTList();
  }

  selectedOT: number = -1;

  loadOTList(){
    this.readService.readOrgTypes().subscribe(otData => this.OTData.data = otData);
  }

  confirmAction(element){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm',
      description: 'Are you absolutely sure you want to delete ' + element.OrgTypeName + '?',
      button1: 'Yes',
      button2: 'No'
    };

    return this.matDialog.open(matDialogComponent, dialogConfig);
  }

  deleteOT(element) {
    let conf = this.confirmAction(element)
  
    conf.afterClosed().subscribe(
      data => { 
        if (data) {
          this.deleteService.deleteOrgType(element.OrgType).subscribe(()=>{
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = "600px";
            dialogConfig.data = {
              title: 'Confirmation',
              description: element.OrgTypeName + ' was successfully deleted',
              button1: 'OK',
              button2: ''
            };
        
            this.matDialog.open(matDialogComponent, dialogConfig);
            this.loadOTList();
          });
        } 
      }
    );
  }

  addOrgType(){
    // We are adding so pass control to the custom window for creation
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {title: 'Please Enter New Org Type Details', model: 'OrgTypes'};

   if (this.matDialog.open(AddDialogComponent, dialogConfig)){
     this.loadOTList();
   }
  }
}

var OT_DATA: OrgTypes[];
