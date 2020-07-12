import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiCreateService } from '../../services/api.createService';
import { ApiDeleteService } from '../../services/api.deleteService';
import { matDialogComponent } from '../matDialog/matDialog.component';

import { FundProviders } from '../../interfaces/globalinterfaces';

@Component({
  selector: 'app-fundprovider-admin',
  templateUrl: './fundprovider-admin.component.html',
  styleUrls: ['./fundprovider-admin.component.css']
})
export class FundproviderAdminComponent implements OnInit {
  FPColumns: string[] = ['FundProviderCode', 'FundProviderName', 'Delete'];
  FPData = new MatTableDataSource<FundProviders>(FP_DATA);

  constructor(private readService: ApiReadService, private createService: ApiCreateService, private deleteService: ApiDeleteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadFPList();
  }

  selectedFP: number = -1;

  loadFPList(){
    this.readService.readAllFundProviders().subscribe(fpData => this.FPData.data = fpData);
  }

  confirmAction(element){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm',
      description: 'Are you absolutely sure you want to delete ' + element.FundProviderName + '?',
      button1: 'Yes',
      button2: 'No'
    };

    return this.dialog.open(matDialogComponent, dialogConfig);
  }

  deleteFP(element) {
    let conf = this.confirmAction(element)
  
    conf.afterClosed().subscribe(
      data => { 
        if (data) {
          this.deleteService.deleteFundProvider(element.FundProviderCode).subscribe(()=>{
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = "600px";
            dialogConfig.data = {
              title: 'Confirmation',
              description: element.FundProviderName + ' was successfully deleted',
              button1: 'OK',
              button2: ''
            };
        
            this.dialog.open(matDialogComponent, dialogConfig);
            this.loadFPList();
          });
        } 
      }
    );
  }

  addFundProvider(){
    let blankFP = {} as FundProviders;
    blankFP.FundProviderCode = 'New';
    blankFP.FundProviderName = '';
    this.FPData.data.push(blankFP);

    console.log(this.FPData);
  }
}

var FP_DATA: FundProviders[];
