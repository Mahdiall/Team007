import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../../shared/models/category';

@Component({
  selector: 'admin/add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  Category: Category = {
    title:''
  }
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {}

  onSubmit(){
    if(this.Category.title != ''){
      this.categoryService.addItem(this.Category);
      this.Category.title = '';
    }
  }
}
