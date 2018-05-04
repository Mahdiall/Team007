import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {AngularFireStorage} from 'angularfire2/storage';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/take';
import {Product} from '../../../shared/models/Product';
import {Category} from '../../../shared/models/category';
import {CategoryService} from '../../../shared/services/category.service';
import {ProductService} from '../../../shared/services/product.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {PostService} from '../../../shared/services/post.service';

@Component({
  selector: 'admin/products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: Product[];
  editState: boolean = false;
  itemToEdit: Product;

  file: File;


  prodCollection: AngularFirestoreCollection<Product>;
  pro: Observable<Product[]>;
  prodDoc: AngularFirestoreDocument<Product>;

  title: string;
  type: string;
  description: string;
  price: number;
  photo: any;
    constructor(private postService: PostService, private afs: AngularFirestore) {
      // afs.firestore.settings({timestampsInSnapshots: true});

    }

    ngOnInit() {
      this.postService.getProducts().subscribe(products => {
        this.products = products;
      });
    }

    add() {
      this.afs.collection('products').add({
        'title': this.title,
        'type': this.type,
        'price': this.price,
        'description': this.description,
        'photo': this.photo
      });
    }

  delete( prod: Product) {
    this.clear();
    this.postService.deleteProduct(prod);
  }

  editable(event, prod: Product) {
    this.editState = true;
    this.itemToEdit = prod;
  }

  update(prod: Product) {
    this.postService.updateProduct(prod);
    this.clear();
  }

  clear() {
    this.editState = false;
    this.itemToEdit = null;
  }
    upload(event) {
      this.postService.uploadPicture(event);
    }
}
