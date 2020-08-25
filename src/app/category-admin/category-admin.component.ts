import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiReadService } from '../../services/api.readService';
import { Categories_model } from '../../models/Categories_model';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {
  CategoryColumns: string[] = ['CategoryCode', 'CategoryName'];
  CategoryData = new MatTableDataSource<Categories_model>(STATUS_DATA);

  constructor(private readService: ApiReadService) { }

  selectedCategory: number = -1;

  ngOnInit(): void {
    this.loadCategoryList();
  }

  loadCategoryList(){
    this.readService.readCategories().subscribe(categoryData => this.CategoryData.data = categoryData);
  }

}

var STATUS_DATA: Categories_model[];
