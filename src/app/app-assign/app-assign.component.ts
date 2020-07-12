import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiReadService } from '../../services/api.readService';
import { ApiCreateService } from '../../services/api.createService';
import { UserData, FundProviders } from '../../interfaces/globalinterfaces';
import { matDialogComponent } from '../matDialog/matDialog.component';

@Component({
  selector: 'app-app-assign',
  templateUrl: './app-assign.component.html',
  styleUrls: ['./app-assign.component.css']
})
export class AppAssignComponent {

  userColumns: string[] = ['id', 'name', 'usertype'];
  userData = new MatTableDataSource<UserData>(USER_DATA);

  FundProviderColumns: string[] = ['FundProviderCode', 'FundProviderName'];
  FundProviderData = new MatTableDataSource<FundProviders>(FUNDP_DATA);

  title: string;
  description: string;
  applicationId: number;
  orgName: string;
  projectName: string;

  constructor(private readService: ApiReadService, private createService: ApiCreateService,
      public dialog: MatDialog, private dialogRef: MatDialogRef<AppAssignComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.title = data.title;
      this.orgName = data.OrgName;
      this.projectName = data.GenName;
      this.description = 'Please select a Proposal Writer and Funding Provider to assign the "' + data.OrgName + 
      '" application for project "' + data.GenName + '"?';
      this.applicationId = data.ApplicationId;
  }

  ngOnInit(): void {
    this.readService.readAllUsers(true).subscribe(nData => this.userData.data = nData);
    this.readService.readAllFundProviders().subscribe(fpData => this.FundProviderData.data = fpData);
  }

  userRow: number = -1;
  selectedUser: number = -1;
  pwName: string;
  fundProviderRow: number = -1;
  selectedFundProvider: string = "";
  fpName: string;

  selectUser(row){
    this.userRow = row;
    this.selectedUser = row.id;
    this.pwName = row.name;
  }

  selectFundProvider(row){
    this.fundProviderRow = row;
    this.selectedFundProvider = row.FundProviderCode;
    this.fpName = row.FundProviderName;
  }

  b1click() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";

    if (this.selectedUser===-1 || this.selectedFundProvider ===""){


      dialogConfig.data = {
        title: 'Warning', button1: 'OK', button2: '',
        description: 'Please select a Proposal Writer and Funding Provider or click Cancel'
      };
    
      this.dialog.open(matDialogComponent, dialogConfig);
    }
    else {
      let conf = this.confirmAction()

      conf.afterClosed().subscribe(
        data => { 
          if (data) {
            // All data present to call the create function
            this.createService.createAssignedApp(
                this.applicationId, 	
                this.selectedUser, 
                this.selectedFundProvider).subscribe(ApplicationId => {
              var AppId: number;
              AppId = ApplicationId as number;

              dialogConfig.data = {
                title: 'Confirmation', description: 'Application successfully Assigned.  The original data has been archived to Unique Reference Id ' + AppId.toString() + '.'
                , button1: 'OK', button2: '' 
              };
  
              this.dialog.open(matDialogComponent, dialogConfig);
  
            })
            this.dialogRef.close(this.selectedUser);
          }
        }
      )
     }
  }

  b2click() {
      this.dialogRef.close(false);
  }


  confirmAction(){
    const dialogConfig = new MatDialogConfig();
    var description: string;
    var title: string;
    var button1: string;
    var button2: string;
  
    description = 'Are you absolutely sure you want to assign ' + this.pwName + ' the "' + this.orgName + '" application for project "' 
      + this.projectName + ' using the ' + this.fpName +' template?';
    title= 'Please Confirm';
    button1 = 'Yes';
    button2 = 'No';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: title, 
      description: description,
      button1: button1,
      button2: button2
    };

    return this.dialog.open(matDialogComponent, dialogConfig);
  }
}

var USER_DATA: UserData[];
var FUNDP_DATA: FundProviders[];