import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiCreateService } from '../../services/api.createService';
import { matDialogComponent } from '../matDialog/matDialog.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  title: string;
  model: string;
  code: string;
  name: string;  

  constructor(private createService: ApiCreateService, private dialogRef: MatDialogRef<AddDialogComponent>, 
      private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

    this.title = data.title;
    this.model = data.model;
  }

  ngOnInit(): void {
  }

  confirmAction(){
    const dialogConfig = new MatDialogConfig();
    var description: string;
    var title: string;
    var button1: string;
    var button2: string;
  
    description = 'Are you absolutely sure?';
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

    return this.matDialog.open(matDialogComponent, dialogConfig);
  }

  b1click() {
    let conf = this.confirmAction()

    conf.afterClosed().subscribe(
      data => { 
        if (data) {
          const dialogConfig = new MatDialogConfig();
  
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = "600px";

          // All data present to call the create function
          switch (this.model) {
            case 'FundProviders':
              this.createService.createFundProvider(this.code, this.name).subscribe(()=>{
                dialogConfig.data = {
                  title: 'Confirmation', description: 'The Fund Provider was successfully added', button1: 'OK', button2: ''
                };
                this.matDialog.open(matDialogComponent, dialogConfig);

              })
              break;

            case 'OrgTypes':
              this.createService.createOrgType(this.code, this.name).subscribe(()=>{
                dialogConfig.data = {
                  title: 'Confirmation', description: 'The Org Type was successfully added', button1: 'OK', button2: ''
                };
                this.matDialog.open(matDialogComponent, dialogConfig);

              })
              break;
          }
          this.dialogRef.close(true);
        }
      }
    )
  }

  b2click() {
    this.dialogRef.close(false);
  }
}
