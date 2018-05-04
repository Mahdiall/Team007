import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import {Product} from '../models/Product';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { map } from 'rxjs/operators/map';

@Injectable()
export class PostService {
  prodCollection: AngularFirestoreCollection<Product>;
  prodDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;

  editState: boolean = false;
  itemToEdit: Product;

  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
    // afs.firestore.settings({ timestampsInSnapshots: true });

    this.prodCollection = this.afs.collection('products');
    this.products = this.prodCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }


  getProducts() {
    return this.products;
  }

  deleteProduct(prod: Product) {
    this.afs.collection('products').doc(prod.id).delete();

  }

  updateProduct(prod: Product) {

    this.afs.collection('products').doc(prod.id).update({
      title: prod.title,
      type: prod.type,
      price: prod.price,
      description: prod.description
    });
  }

  uploadPicture(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
  }

}
