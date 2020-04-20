import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiUpdateService } from '../../services/api.updateService';
import { matDialogComponent } from '../matDialog/matDialog.component';

import { UserData } from '../../interfaces/globalinterfaces';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  userColumns: string[] = ['id', 'name', 'email', 'usertype', 'Promote', 'Demote'];
  userData = new MatTableDataSource<UserData>(USER_DATA);

  constructor(private readService: ApiReadService, private updateService: ApiUpdateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUserList();
  }

  selectedUser: number = -1;

  // Initial load of all users
  loadUserList() {
    this.readService.readAllUsers().subscribe(nData => this.userData.data = nData);

  }

  confirmAction(element, action: string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = {
      title: 'Please Confirm',
      description: 'Are you absolutely sure you want to ' + action + ' ' + element.name + '?',
      button1: 'Yes',
      button2: 'No'
    };

    return this.dialog.open(matDialogComponent, dialogConfig);
  }

  updateApp(element, action: string) {
    let conf = this.confirmAction(element, action)
    var usertype: string;

    switch  (action) {
      case 'Promote': usertype = "A"; break;
      case 'Demote': usertype = "P"; break;
      default:
              console.log("No such action exists!");
              break;
    }

    conf.afterClosed().subscribe(
      data => { 
        if (data) {
          this.updateService.updateUser(element.id, usertype).subscribe(()=>{
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = "600px";
            dialogConfig.data = {
              title: 'Confirmation',
              description: element.name + ' was successfully ' + action + 'd',
              button1: 'OK',
              button2: ''
            };
        
            this.dialog.open(matDialogComponent, dialogConfig);
            this.loadUserList();
          });
        } 
      }
    );
  }
}

var USER_DATA: UserData[];
