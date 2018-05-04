import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import {Category} from '../models/category';

@Injectable()
export class CategoryService {

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;

  constructor(private afs: AngularFirestore) {
    // afs.firestore.settings({ timestampsInSnapshots: true });
    this.categoriesCollection = this.afs.collection('admin/category');

    this.categories = this.categoriesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      });
    });

  }

  getCategories(){
    return this.categories;
  }
  addItem(category : Category) {
    this.categoriesCollection.add(category);
  }

  }
