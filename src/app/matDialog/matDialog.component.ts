import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiReadService } from '../../services/api.readService';
import { UserData } from '../../interfaces/globalinterfaces';

/**
 * @title Popup dialog/alert box based on supplied MadDialogConfig data
 */

@Component({
  selector: 'matDialog',
  templateUrl: 'matDialog.component.html',
  styleUrls: ['matDialog.component.css']
})

export class matDialogComponent {

  userColumns: string[] = ['id', 'name', 'usertype'];
  userData = new MatTableDataSource<UserData>(USER_DATA);

  title: string;
  description: string;
  button1: string;
  button2: string;
  action: string;

  isBtn2Visible = true;
  isAssignAction = false;

  constructor(private readService: ApiReadService,
      private dialogRef: MatDialogRef<matDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.title = data.title;
      this.description = data.description;
      this.button1 = data.button1;
      this.button2 = data.button2;

      if (data.action === 'Assign') {
        // Assignment in progress so display the Proposal Writer selection window
        this.isAssignAction = true;
      }

      if (this.button2 === "")
         {this.isBtn2Visible = false;}
  }

  ngOnInit(): void {
    this.loadUserList();
  }

  selectedUser: number = -1;
  userRow: number = -1;

  selectUser(row){
    this.userRow = row;
    this.selectedUser = row.id;
  }

  // Initial load of all users
  loadUserList() {
    this.readService.readAllUsers(true).subscribe(nData => this.userData.data = nData);

  }

  b1click() {
    if (this.isAssignAction && this.selectedUser===-1){
      alert("Please select a Proposal Writer or click 'Cancel'");
    }
    else {
      if (this.isAssignAction){
        this.dialogRef.close(this.selectedUser);
      }
      else {
        this.dialogRef.close(true);
      }       
    }
  }

  b2click() {
      this.dialogRef.close(false);
  }
}


var USER_DATA: UserData[];
