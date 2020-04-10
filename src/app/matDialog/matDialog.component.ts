import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'matDialog',
  templateUrl: 'matDialog.component.html',
  styleUrls: ['matDialog.component.css']
})

export class matDialogComponent {

  title: string;
  description: string;
  button1: string;
  button2: string;

  constructor(
      private dialogRef: MatDialogRef<matDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.title = data.title;
      this.description = data.description;
      this.button1 = data.button1;
      this.button2 = data.button2;

  }

  b1click() {
      this.dialogRef.close(true);
  }

  b2click() {
      this.dialogRef.close(false);
  }
}
