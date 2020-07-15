import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiReadService } from '../../services/api.readService';
import { Statuses_model } from '../../models/Statuses_model';

@Component({
  selector: 'app-status-admin',
  templateUrl: './status-admin.component.html',
  styleUrls: ['./status-admin.component.css']
})
export class StatusAdminComponent implements OnInit {
  StatusColumns: string[] = ['StatusCode', 'StatusName'];
  StatusData = new MatTableDataSource<Statuses_model>(STATUS_DATA);

  constructor(private readService: ApiReadService) { }

  selectedStatus: number = -1;

  ngOnInit(): void {
    this.loadStatusList();
  }

  loadStatusList(){
    this.readService.readStatuses().subscribe(statusData => this.StatusData.data = statusData);
  }
}

var STATUS_DATA: Statuses_model[];
