import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiReadService } from '../../services/api.readService';
import { ApiCreateService } from '../../services/api.createService';
import { ApiDeleteService } from '../../services/api.deleteService';
import { matDialogComponent } from '../matDialog/matDialog.component';

import { OrgTypes } from '../../interfaces/globalinterfaces';


@Component({
  selector: 'app-orgtype-admin',
  templateUrl: './orgtype-admin.component.html',
  styleUrls: ['./orgtype-admin.component.css']
})
export class OrgtypeAdminComponent implements OnInit {
  OTColumns: string[] = ['OrgTypeCode', 'OrgTypeName'];
  OTData = new MatTableDataSource<OrgTypes>(OT_DATA);

  constructor(private readService: ApiReadService, private createService: ApiCreateService, private deleteService: ApiDeleteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadOTList();
  }

  selectedOT: number = -1;

  loadOTList(){
    this.readService.readOrgTypes().subscribe(otData => this.OTData.data = otData);
  }
}

var OT_DATA: OrgTypes[];
