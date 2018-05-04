import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../../shared/models/category';
import { FirebaseApp } from 'angularfire2';


@Component({
  selector: 'admin/category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];

  constructor(public categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      //console.log(categories);
      this.categories = categories;
    });
  }
}

