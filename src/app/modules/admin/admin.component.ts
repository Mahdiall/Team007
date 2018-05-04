import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {BsNavbarComponent} from '../../shared/components/bs-navbar/bs-navbar.component';
import {Observable} from 'rxjs/Observable';
import {Product} from '../../shared/models/Product';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products$: Observable<Product[]>

  userName: string;
  constructor(private productService: ProductService, rout: Router, authService: AuthService, navBar: BsNavbarComponent) {
    this.userName = navBar.user_displayName;
    this.products$ = productService.getAll();
    console.log(this.userName);
    console.log('is Admin ' + authService.isAdmin);
    if (authService.isAdmin) {
      rout.navigateByUrl('admin');
    } else {
      rout.navigateByUrl('about');
    }
  }

  ngOnInit() {
  }

}
/*
export class AdminProductsComponent {
  products$: Observable<Product[]>

  constructor(private productService: ProductService) {
    this.products$ = productService.getAll();
  }

}
 */
